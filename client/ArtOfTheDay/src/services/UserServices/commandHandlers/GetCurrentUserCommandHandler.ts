import {IRepository} from '@/src/repositories/IRepository';
import {UserData} from '@/src/domain/UserData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IUserClient} from '@/src/services/UserServices/IUserClient';
import {GetCurrentUserCommand} from '@/src/services/UserServices/UserCommands';

export class GetCurrentUserCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IUserClient,
        private readonly repository: IRepository<UserData>,
    ) {
        super();
    }

    async handle(_command: GetCurrentUserCommand): Promise<void> {
        await this.timed('GetCurrentUser', async () => {
            const user = await this.client.getCurrentUser();
            await this.repository.update(user);
        });
    }
}
