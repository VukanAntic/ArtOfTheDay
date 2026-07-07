import {IRepository} from '@/src/repositories/IRepository';
import {SeenImageData} from '@/src/domain/SeenImageData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {INextImageClient} from '@/src/services/NextImageServices/INextImageClient';
import {GetHistoryCommand} from '@/src/services/NextImageServices/NextImageCommands';

export class GetHistoryCommandHandler extends CommandHandler {
    constructor(
        private readonly client: INextImageClient,
        private readonly repository: IRepository<SeenImageData[]>,
    ) {
        super();
    }

    async handle(_command: GetHistoryCommand): Promise<void> {
        await this.timed('GetHistory', async () => {
            const history = await this.client.getHistory();
            await this.repository.update(history);
        });
    }
}
