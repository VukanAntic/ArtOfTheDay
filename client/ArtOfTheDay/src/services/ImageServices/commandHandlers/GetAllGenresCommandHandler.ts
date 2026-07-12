import {GenreData} from '@/src/domain/GenreData';
import {IRepository} from '@/src/repositories/IRepository';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IImageClient} from '@/src/services/ImageServices/IImageClient';

export class GetAllGenresCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IImageClient,
        private readonly repository: IRepository<GenreData[]>,
    ) {
        super();
    }

    async handle(): Promise<void> {
        await this.timed('GetAllGenres', async () => {
            const genres = await this.client.getAllGenres();
            await this.repository.update(genres);
        });
    }
}
