import {CommandHandler} from '@/src/services/CommandHandler';
import {IImageClient} from '@/src/services/ImageServices/IImageClient';
import {GetRandomArtworkIdCommand} from '@/src/services/ImageServices/ImageCommands';

export class GetRandomArtworkIdCommandHandler extends CommandHandler {
    constructor(private readonly client: IImageClient) {
        super();
    }

    async handle(command: GetRandomArtworkIdCommand): Promise<number> {
        return this.timed('GetRandomArtworkId', () => this.client.getRandomArtworkId(command));
    }
}
