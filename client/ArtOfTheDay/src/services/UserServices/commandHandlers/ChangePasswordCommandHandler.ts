import {IRepository} from '@/src/repositories/IRepository';
import {UserData} from '@/src/domain/UserData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IUserClient} from '@/src/services/UserServices/IUserClient';
import {ChangePasswordCommand} from '@/src/services/UserServices/UserCommands';

export class ChangePasswordCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IUserClient,
        private readonly repository: IRepository<UserData>,
    ) {
        super();
    }

    async handle(command: ChangePasswordCommand): Promise<void> {
        await this.timed('ChangePassword', async () => {
            const user = await this.client.changePassword(command.oldPassword, command.newPassword);
            await this.repository.update(user);
        });
    }
}
