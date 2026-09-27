import {IRepository} from '@/src/repositories/IRepository';
import {UserHistoryData} from '@/src/domain/UserHistoryData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {INextImageClient} from '@/src/services/NextImageServices/INextImageClient';
import {GetHistoryCommand} from '@/src/services/NextImageServices/NextImageCommands';

export class GetHistoryCommandHandler extends CommandHandler {
    constructor(
        private readonly client: INextImageClient,
        private readonly repository: IRepository<UserHistoryData>,
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
