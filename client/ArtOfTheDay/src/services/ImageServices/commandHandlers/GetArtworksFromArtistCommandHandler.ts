import {IdentityArtworkData} from '@/src/domain/IdentityArtworkData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IImageClient} from '@/src/services/ImageServices/IImageClient';
import {GetArtworksFromArtistCommand} from '@/src/services/ImageServices/ImageCommands';

export class GetArtworksFromArtistCommandHandler extends CommandHandler {
    constructor(private readonly client: IImageClient) {
        super();
    }

    async handle(command: GetArtworksFromArtistCommand): Promise<IdentityArtworkData[]> {
        return this.timed('GetArtworksFromArtist', () => this.client.getArtworksFromArtist(command));
    }
}
