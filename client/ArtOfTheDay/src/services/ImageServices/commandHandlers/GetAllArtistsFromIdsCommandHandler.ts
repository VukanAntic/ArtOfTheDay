import {Artist} from '@/src/domain/ArtistData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IImageClient} from '@/src/services/ImageServices/IImageClient';
import {GetAllArtistsFromIdsCommand} from '@/src/services/ImageServices/ImageCommands';

export class GetAllArtistsFromIdsCommandHandler extends CommandHandler {
    constructor(private readonly client: IImageClient) {
        super();
    }

    async handle(command: GetAllArtistsFromIdsCommand): Promise<Artist[]> {
        return this.timed('GetAllArtistsFromIds', () => this.client.getAllArtistsFromIds(command));
    }
}
