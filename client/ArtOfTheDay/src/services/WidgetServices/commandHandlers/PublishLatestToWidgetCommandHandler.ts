import {IRepository} from '@/src/repositories/IRepository';
import {SeenImageData} from '@/src/domain/SeenImageData';
import {AllArtworksData} from '@/src/domain/AllArtworksData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IWidgetPublisher} from '@/src/services/WidgetServices/IWidgetPublisher';
import {PublishLatestToWidgetCommand} from '@/src/services/WidgetServices/WidgetCommands';

export class PublishLatestToWidgetCommandHandler extends CommandHandler {
    private publishing = false;

    constructor(
        private readonly historyRepository: IRepository<SeenImageData[]>,
        private readonly artworkRepository: IRepository<AllArtworksData>,
        private readonly publisher: IWidgetPublisher,
    ) {
        super();
    }

    async handle(_command: PublishLatestToWidgetCommand): Promise<void> {
        if (!this.publisher.isSupported()) return;
        if (this.publishing) return;

        this.publishing = true;
        try {
            await this.timed('PublishLatestToWidget', async () => {
                const history = await this.historyRepository.get() ?? [];
                if (history.length === 0) return;

                const sorted = [...history].sort((a, b) => a.seenAt.getTime() - b.seenAt.getTime());
                const latest = sorted[sorted.length - 1];

                const allArtworks = await this.artworkRepository.get();
                const artwork = allArtworks?.getById(latest.artworkId);
                if (!artwork) return;

                await this.publisher.publish({
                    imageUrl: artwork.imageUrl,
                    title: artwork.title,
                    artistName: artwork.artist.name,
                    imageDateISO: latest.seenAt.toISOString(),
                });
            });
        } finally {
            this.publishing = false;
        }
    }
}
