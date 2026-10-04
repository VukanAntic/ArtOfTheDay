import {AppState, AppStateStatus} from 'react-native';
import {IRepository} from '@/src/repositories/IRepository';
import {UserHistoryData} from '@/src/domain/UserHistoryData';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {AllArtworksData} from '@/src/domain/AllArtworksData';
import {ViewController} from '@/src/mvc/ViewController';
import {GetHistoryCommandHandler} from '@/src/services/NextImageServices/commandHandlers/GetHistoryCommandHandler';
import {GetArtworksFromIdsCommandHandler} from '@/src/services/ImageServices/commandHandlers/GetArtworksFromIdsCommandHandler';
import {NextImageWebSocketService} from '@/src/services/NextImageServices/NextImageWebSocketService';
import {AddLikedArtworkCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/AddLikedArtworkCommandHandler';
import {RemoveLikedArtworkCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/RemoveLikedArtworkCommandHandler';
import {AddDislikedArtworkCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/AddDislikedArtworkCommandHandler';
import {RemoveDislikedArtworkCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/RemoveDislikedArtworkCommandHandler';
import {
    SetProfileArtworkCommandHandler
} from '@/src/services/PreferenceServices/commandHandlers/SetProfileArtworkCommandHandler';
import {
    ClearProfileArtworkCommandHandler
} from '@/src/services/PreferenceServices/commandHandlers/ClearProfileArtworkCommandHandler';
import {ArtworkPreferenceIntent} from '@/src/services/PreferenceServices/ArtworkPreferenceIntent';
import {PublishLatestToWidgetCommandHandler} from '@/src/services/WidgetServices/commandHandlers/PublishLatestToWidgetCommandHandler';
import {SetTimeZoneCommandHandler} from '@/src/services/NextImageServices/commandHandlers/SetTimeZoneCommandHandler';
import {getDeviceTimeZoneId} from '@/src/utils/deviceTimeZone';
import FeaturedArtworkViewData from '@/src/components/FeaturedArtwork/FeaturedArtworkViewData';
import HomeScreenView from './HomeScreenView';
import {HomeScreenViewData} from './HomeScreenViewData';

const RESUME_SYNC_AFTER_MS = 60_000;

export class HomeScreenController extends ViewController<HomeScreenViewData, ArtworkPreferenceIntent> {
    readonly View = HomeScreenView;

    private loading = false;
    private resyncing = false;
    private backgroundedAt: number | null = null;
    private jumpToLatestRequest = 0;
    private unsubscribe: (() => void) | null = null;
    private appStateSubscription: ReturnType<typeof AppState.addEventListener> | null = null;

    constructor(
        private readonly getHistoryHandler: GetHistoryCommandHandler,
        private readonly getArtworksFromIdsHandler: GetArtworksFromIdsCommandHandler,
        private readonly getValidToken: () => Promise<string | null>,
        private readonly historyRepository: IRepository<UserHistoryData>,
        private readonly webSocketService: NextImageWebSocketService,
        private readonly addLikedArtworkHandler: AddLikedArtworkCommandHandler,
        private readonly removeLikedArtworkHandler: RemoveLikedArtworkCommandHandler,
        private readonly addDislikedArtworkHandler: AddDislikedArtworkCommandHandler,
        private readonly removeDislikedArtworkHandler: RemoveDislikedArtworkCommandHandler,
        private readonly preferencesRepository: IRepository<UserPreferencesData>,
        private readonly artworkRepository: IRepository<AllArtworksData>,
        private readonly publishLatestToWidgetHandler: PublishLatestToWidgetCommandHandler,
        private readonly ensureSession: () => Promise<void>,
        private readonly setProfileArtworkHandler: SetProfileArtworkCommandHandler,
        private readonly clearProfileArtworkHandler: ClearProfileArtworkCommandHandler,
        private readonly setTimeZoneHandler: SetTimeZoneCommandHandler,
    ) {
        super(new HomeScreenViewData([], false, null));
    }

    onMount(): void {
        void this.initialize();
        void this.connectWebSocket();
        this.unsubscribe = this.preferencesRepository.subscribe(() => void this.load());
        this.appStateSubscription = AppState.addEventListener('change', state => this.onAppStateChange(state));
    }

    private onAppStateChange(state: AppStateStatus): void {
        if (state === 'background') {
            this.backgroundedAt ??= Date.now();
            return;
        }
        if (state !== 'active') return;

        const awayMs = this.backgroundedAt === null ? 0 : Date.now() - this.backgroundedAt;
        this.backgroundedAt = null;
        if (awayMs >= RESUME_SYNC_AFTER_MS) {
            void this.resumeSync();
        } else {
            void this.publishToWidget();
        }
    }

    private async resumeSync(): Promise<void> {
        if (this.resyncing) return;
        this.resyncing = true;
        try {
            const newestBefore = await this.newestSeenAtMs();

            this.webSocketService.disconnect();
            void this.connectWebSocket();

            await this.setTimeZoneHandler.handle({timeZoneId: getDeviceTimeZoneId()})
                .catch(e => console.error('[HomeScreen] time zone sync failed:', e));
            await this.refreshOnNewImage();
            await this.load();

            if (await this.newestSeenAtMs() > newestBefore) this.requestJumpToLatest();
        } catch (e) {
            console.error('[HomeScreen] resume sync failed:', e);
        } finally {
            this.resyncing = false;
        }
    }

    private async newestSeenAtMs(): Promise<number> {
        const history = (await this.historyRepository.get())?.seenImages ?? [];
        return history.reduce((newest, seen) => Math.max(newest, seen.seenAt.getTime()), 0);
    }

    private requestJumpToLatest(): void {
        this.jumpToLatestRequest += 1;
        const snapshot = this.getSnapshot();
        this.setViewData(new HomeScreenViewData(snapshot.artworks, snapshot.loaded, snapshot.profileImageUrl, this.jumpToLatestRequest));
    }

    onUnmount(): void {
        this.unsubscribe?.();
        this.unsubscribe = null;
        this.appStateSubscription?.remove();
        this.appStateSubscription = null;
        this.webSocketService.disconnect();
    }

    onMessage(intent: ArtworkPreferenceIntent): void {
        this.handlePreference(intent)
            .catch(e => console.error('[HomeScreen] preference intent failed:', e));
    }

    private async initialize(): Promise<void> {
        try {
            await this.ensureSession();
        } catch (e) {
            console.error('[HomeScreen] session bootstrap failed:', e);
        }
        await this.load();
    }

    private async load(): Promise<void> {
        if (this.loading) return;
        this.loading = true;
        try {
            const artworks = await this.buildArtworks();
            this.setViewData(new HomeScreenViewData(artworks, true, await this.buildProfileImageUrl(), this.jumpToLatestRequest));
        } catch (e) {
            console.error('[HomeScreen] loadArtworks failed:', e);
            this.setViewData(new HomeScreenViewData(this.getSnapshot().artworks, true, this.getSnapshot().profileImageUrl, this.jumpToLatestRequest));
        } finally {
            this.loading = false;
        }
    }

    private async buildArtworks(): Promise<FeaturedArtworkViewData[]> {
        const history = (await this.historyRepository.get())?.seenImages ?? [];
        if (history.length === 0) return [];

        const allArtworks = await this.artworkRepository.get();
        const preferences = await this.preferencesRepository.get();
        const likedIds = new Set(preferences?.likedArtworkIds ?? []);

        return [...history]
            .sort((a, b) => a.seenAt.getTime() - b.seenAt.getTime())
            .map(seenImage => {
                const artwork = allArtworks?.getById(seenImage.artworkId);
                return artwork ? new FeaturedArtworkViewData(artwork, seenImage, likedIds.has(artwork.id)) : null;
            })
            .filter((item): item is FeaturedArtworkViewData => item !== null);
    }

    private async buildProfileImageUrl(): Promise<string | null> {
        const preferences = await this.preferencesRepository.get();
        if (!preferences?.profileArtworkId) return null;
        const allArtworks = await this.artworkRepository.get();
        return allArtworks?.getById(preferences.profileArtworkId)?.imageUrl ?? null;
    }

    private connectWebSocket(): void {
        this.webSocketService.connect(this.getValidToken, () => {
            this.refreshOnNewImage()
                .then(() => this.load())
                .catch(e => console.error('[HomeScreen] new-image refresh failed:', e));
        });
    }

    private async refreshOnNewImage(): Promise<void> {
        await this.getHistoryHandler.handle({});
        const history = (await this.historyRepository.get())?.seenImages ?? [];
        const allArtworks = await this.artworkRepository.get();
        const missingIds = history
            .map(s => s.artworkId)
            .filter(id => !allArtworks?.getById(id));
        if (missingIds.length > 0) {
            await this.getArtworksFromIdsHandler.handle({artworkIds: missingIds});
        }
        await this.publishToWidget();
    }

    private async publishToWidget(): Promise<void> {
        await this.publishLatestToWidgetHandler.handle({})
            .catch(e => console.error('[HomeScreen] widget publish failed:', e));
    }

    private async handlePreference(intent: ArtworkPreferenceIntent): Promise<void> {
        switch (intent.type) {
            case 'LIKE':
                return this.addLikedArtworkHandler.handle({artworkId: intent.artworkId});
            case 'UNLIKE':
                return this.removeLikedArtworkHandler.handle({artworkId: intent.artworkId});
            case 'DISLIKE':
                return this.addDislikedArtworkHandler.handle({artworkId: intent.artworkId});
            case 'UNDISLIKE':
                return this.removeDislikedArtworkHandler.handle({artworkId: intent.artworkId});
            case 'SET_PROFILE':
                return this.setProfileArtworkHandler.handle({artworkId: intent.artworkId});
            case 'CLEAR_PROFILE':
                return this.clearProfileArtworkHandler.handle({});
        }
    }
}
