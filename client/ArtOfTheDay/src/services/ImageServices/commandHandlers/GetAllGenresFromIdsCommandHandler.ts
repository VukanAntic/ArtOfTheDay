import {Genre} from '@/src/domain/GenreData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IImageClient} from '@/src/services/ImageServices/IImageClient';
import {GetAllGenresFromIdsCommand} from '@/src/services/ImageServices/ImageCommands';

export class GetAllGenresFromIdsCommandHandler extends CommandHandler {
    constructor(private readonly client: IImageClient) {
        super();
    }

    async handle(command: GetAllGenresFromIdsCommand): Promise<Genre[]> {
        return this.timed('GetAllGenresFromIds', () => this.client.getAllGenresFromIds(command));
    }
}
