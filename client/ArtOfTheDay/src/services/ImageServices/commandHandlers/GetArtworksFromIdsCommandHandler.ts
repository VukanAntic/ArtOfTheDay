import {AllArtworksData} from '@/src/domain/AllArtworksData';
import {IRepository} from '@/src/repositories/IRepository';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IImageClient} from '@/src/services/ImageServices/IImageClient';
import {GetArtworksFromIdsCommand} from '@/src/services/ImageServices/ImageCommands';

export class GetArtworksFromIdsCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IImageClient,
        private readonly repository: IRepository<AllArtworksData>,
    ) {
        super();
    }

    async handle(command: GetArtworksFromIdsCommand): Promise<void> {
        await this.timed('GetArtworksFromIds', async () => {
            const fetched = await this.client.getArtworksFromIds(command);
            const current = await this.repository.get() ?? new AllArtworksData();
            await this.repository.update(current.append(fetched));
        });
    }
}
