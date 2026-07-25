import {ArtworkData} from '@/src/domain/ArtworkData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IImageClient} from '@/src/services/ImageServices/IImageClient';
import {GetRandomArtworksCommand} from '@/src/services/ImageServices/ImageCommands';

export class GetRandomArtworksCommandHandler extends CommandHandler {
    constructor(private readonly client: IImageClient) {
        super();
    }

    async handle(command: GetRandomArtworksCommand): Promise<ArtworkData[]> {
        return this.timed('GetRandomArtworks', () => this.client.getRandomArtworks(command));
    }
}
