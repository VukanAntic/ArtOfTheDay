import {Artwork} from '@/src/domain/ArtworkData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IImageClient} from '@/src/services/ImageServices/IImageClient';
import {GetArtworksFromIdsCommand} from '@/src/services/ImageServices/ImageCommands';

export class GetArtworksFromIdsCommandHandler extends CommandHandler {
    constructor(private readonly client: IImageClient) {
        super();
    }

    async handle(command: GetArtworksFromIdsCommand): Promise<Artwork[]> {
        return this.timed('GetArtworksFromIds', () => this.client.getArtworksFromIds(command));
    }
}
