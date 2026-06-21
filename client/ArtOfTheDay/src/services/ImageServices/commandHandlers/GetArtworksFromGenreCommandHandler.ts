import {IdentityArtworkData} from '@/src/domain/IdentityArtworkData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IImageClient} from '@/src/services/ImageServices/IImageClient';
import {GetArtworksFromGenreCommand} from '@/src/services/ImageServices/ImageCommands';

export class GetArtworksFromGenreCommandHandler extends CommandHandler {
    constructor(private readonly client: IImageClient) {
        super();
    }

    async handle(command: GetArtworksFromGenreCommand): Promise<IdentityArtworkData[]> {
        return this.timed('GetArtworksFromGenre', () => this.client.getArtworksFromGenre(command));
    }
}
