import {AppState} from 'react-native';
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
import FeaturedArtworkViewData from '@/src/components/FeaturedArtwork/FeaturedArtworkViewData';
import HomeScreenView from './HomeScreenView';
import {HomeScreenViewData} from './HomeScreenViewData';

export class HomeScreenController extends ViewController<HomeScreenViewData, ArtworkPreferenceIntent> {
    readonly View = HomeScreenView;

    private loading = false;
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
    ) {
        super(new HomeScreenViewData([], false, null));
    }

    onMount(): void {
        void this.initialize();
        void this.connectWebSocket();
        this.unsubscribe = this.preferencesRepository.subscribe(() => void this.load());
        this.appStateSubscription = AppState.addEventListener('change', state => {
            if (state === 'active') void this.publishToWidget();
        });
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
            this.setViewData(new HomeScreenViewData(artworks, true, await this.buildProfileImageUrl()));
        } catch (e) {
            console.error('[HomeScreen] loadArtworks failed:', e);
            this.setViewData(new HomeScreenViewData(this.getSnapshot().artworks, true, this.getSnapshot().profileImageUrl));
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

    private async connectWebSocket(): Promise<void> {
        const token = await this.getValidToken();
        if (!token) return;
        this.webSocketService.connect(token, () => {
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
