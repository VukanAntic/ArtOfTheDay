import {IRepository} from '@/src/repositories/IRepository';
import {SeenImageData} from '@/src/domain/SeenImageData';
import {GetHistoryCommandHandler} from '@/src/services/NextImageServices/commandHandlers/GetHistoryCommandHandler';
import {
    GetArtworksFromIdsCommandHandler
} from '@/src/services/ImageServices/commandHandlers/GetArtworksFromIdsCommandHandler';
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
    ) {
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

    async loadArtworks(): Promise<FeaturedArtworkViewData[]> {
        const token = await this.getValidToken();
        if (!token) return [];

        await this.getHistoryHandler.handle({});
        const history = await this.historyRepository.get() ?? [];
        if (history.length === 0) return [];

        const artworkIds = history.map(s => s.artworkId);
        const artworks = await this.getArtworksFromIdsHandler.handle({artworkIds});

        return [...history]
            .sort((a, b) => b.seenAt.getTime() - a.seenAt.getTime())
            .map(seenImage => {
                const artwork = artworks.find(a => a.id === seenImage.artworkId);
                return artwork ? new FeaturedArtworkViewData(artwork, seenImage) : null;
            })
            .filter((item): item is FeaturedArtworkViewData => item !== null);
    }

    async connectWebSocket(onRefresh: () => void): Promise<void> {
        const token = await this.getValidToken();
        if (!token) return;
        this.webSocketService.connect(token, onRefresh);
    }

    disconnect(): void {
        this.webSocketService.disconnect();
    }
}
