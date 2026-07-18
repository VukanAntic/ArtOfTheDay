import {IRepository} from '@/src/repositories/IRepository';
import {UserData} from '@/src/domain/UserData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IUserClient} from '@/src/services/UserServices/IUserClient';
import {ChangeEmailCommand} from '@/src/services/UserServices/UserCommands';

export class ChangeEmailCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IUserClient,
        private readonly repository: IRepository<UserData>,
    ) {
        super();
    }

    async handle(command: ChangeEmailCommand): Promise<void> {
        await this.timed('ChangeEmail', async () => {
            const user = await this.client.changeEmail(command.newEmail);
            await this.repository.update(user);
        });
    }
}
