import {IRepository} from '@/src/repositories/IRepository';
import {SeenImageData} from '@/src/domain/SeenImageData';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {AllArtworksData} from '@/src/domain/AllArtworksData';
import {GetHistoryCommandHandler} from '@/src/services/NextImageServices/commandHandlers/GetHistoryCommandHandler';
import {GetArtworksFromIdsCommandHandler} from '@/src/services/ImageServices/commandHandlers/GetArtworksFromIdsCommandHandler';
import {NextImageWebSocketService} from '@/src/services/NextImageServices/NextImageWebSocketService';
import {AddLikedArtworkCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/AddLikedArtworkCommandHandler';
import {RemoveLikedArtworkCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/RemoveLikedArtworkCommandHandler';
import {AddDislikedArtworkCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/AddDislikedArtworkCommandHandler';
import {RemoveDislikedArtworkCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/RemoveDislikedArtworkCommandHandler';
import {ArtworkPreferenceIntent} from '@/src/services/PreferenceServices/ArtworkPreferenceIntent';
import FeaturedArtworkViewData from '@/src/components/FeaturedArtwork/FeaturedArtworkViewData';

export class HomeScreenController {
    constructor(
        private readonly getHistoryHandler: GetHistoryCommandHandler,
        private readonly getArtworksFromIdsHandler: GetArtworksFromIdsCommandHandler,
        private readonly getValidToken: () => Promise<string | null>,
        private readonly historyRepository: IRepository<SeenImageData[]>,
        private readonly webSocketService: NextImageWebSocketService,
        private readonly addLikedArtworkHandler: AddLikedArtworkCommandHandler,
        private readonly removeLikedArtworkHandler: RemoveLikedArtworkCommandHandler,
        private readonly addDislikedArtworkHandler: AddDislikedArtworkCommandHandler,
        private readonly removeDislikedArtworkHandler: RemoveDislikedArtworkCommandHandler,
        private readonly preferencesRepository: IRepository<UserPreferencesData>,
        private readonly artworkRepository: IRepository<AllArtworksData>,
    ) {
    }

    async loadArtworks(): Promise<FeaturedArtworkViewData[]> {
        const history = await this.historyRepository.get() ?? [];
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

    dispatchPreference(intent: ArtworkPreferenceIntent): void {
        this.handlePreference(intent)
            .catch(e => console.error('[HomeScreen] preference intent failed:', e));
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
        }
    }

    async connectWebSocket(onRefreshed: () => void): Promise<void> {
        const token = await this.getValidToken();
        if (!token) return;
        this.webSocketService.connect(token, () => {
            this.refreshOnNewImage()
                .then(onRefreshed)
                .catch(e => console.error('[HomeScreen] new-image refresh failed:', e));
        });
    }

    private async refreshOnNewImage(): Promise<void> {
        console.log('[HomeScreen] new-image broadcast received');
        await this.getHistoryHandler.handle({});
        const history = await this.historyRepository.get() ?? [];
        const allArtworks = await this.artworkRepository.get();
        const missingIds = history
            .map(s => s.artworkId)
            .filter(id => !allArtworks?.getById(id));
        if (missingIds.length > 0) {
            await this.getArtworksFromIdsHandler.handle({artworkIds: missingIds});
            console.log('[HomeScreen] broadcast added artwork(s) to repo:', missingIds);
        }
    }


    disconnect(): void {
        this.webSocketService.disconnect();
    }
}
