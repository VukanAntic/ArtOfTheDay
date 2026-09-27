import {IRepository} from '@/src/repositories/IRepository';
import {UserHistoryData} from '@/src/domain/UserHistoryData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {INextImageClient} from '@/src/services/NextImageServices/INextImageClient';
import {SetPreferredTimeCommand} from '@/src/services/NextImageServices/NextImageCommands';

export class SetPreferredTimeCommandHandler extends CommandHandler {
    constructor(
        private readonly client: INextImageClient,
        private readonly repository: IRepository<UserHistoryData>,
    ) {
        super();
    }

    async handle(command: SetPreferredTimeCommand): Promise<void> {
        await this.timed('SetPreferredTime', async () => {
            const history = await this.repository.get();
            await this.repository.update(new UserHistoryData(
                history?.seenImages ?? [],
                command.preferredTimeInHours,
                command.preferredTimeInMinutes,
            ));
            await this.client.setPreferredTime(command);
        });
    }
}
