import {Genre} from '@/src/domain/GenreData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IImageClient} from '@/src/services/ImageServices/IImageClient';

export class GetAllGenresCommandHandler extends CommandHandler {
    constructor(private readonly client: IImageClient) {
        super();
    }

    async handle(): Promise<Genre[]> {
        return this.timed('GetAllGenres', () => this.client.getAllGenres());
    }
}
