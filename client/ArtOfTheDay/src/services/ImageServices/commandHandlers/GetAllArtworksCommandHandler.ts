import {Artwork} from '@/src/domain/ArtworkData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IImageClient} from '@/src/services/ImageServices/IImageClient';

export class GetAllArtworksCommandHandler extends CommandHandler {
    constructor(private readonly client: IImageClient) {
        super();
    }

    async handle(): Promise<Artwork[]> {
        return this.timed('GetAllArtworks', () => this.client.getAllArtworks());
    }
}
