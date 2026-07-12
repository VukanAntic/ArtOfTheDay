import {ArtistData} from '@/src/domain/ArtistData';
import {IRepository} from '@/src/repositories/IRepository';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IImageClient} from '@/src/services/ImageServices/IImageClient';

export class GetAllArtistsCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IImageClient,
        private readonly repository: IRepository<ArtistData[]>,
    ) {
        super();
    }

    async handle(): Promise<void> {
        await this.timed('GetAllArtists', async () => {
            const artists = await this.client.getAllArtists();
            await this.repository.update(artists);
        });
    }
}
