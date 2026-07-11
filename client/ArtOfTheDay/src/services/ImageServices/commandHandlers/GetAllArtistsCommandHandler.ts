import {ArtistData} from '@/src/domain/ArtistData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IImageClient} from '@/src/services/ImageServices/IImageClient';

export class GetAllArtistsCommandHandler extends CommandHandler {
    constructor(private readonly client: IImageClient) {
        super();
    }

    async handle(): Promise<ArtistData[]> {
        return this.timed('GetAllArtists', () => this.client.getAllArtists());
    }
}
