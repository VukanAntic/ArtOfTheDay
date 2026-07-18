import {IRepository} from '@/src/repositories/IRepository';
import {UserData} from '@/src/domain/UserData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IUserClient} from '@/src/services/UserServices/IUserClient';
import {ChangeNameCommand} from '@/src/services/UserServices/UserCommands';

export class ChangeNameCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IUserClient,
        private readonly repository: IRepository<UserData>,
    ) {
        super();
    }

    async handle(command: ChangeNameCommand): Promise<void> {
        await this.timed('ChangeName', async () => {
            const user = await this.client.changeName(command.newFirstName, command.newLastName);
            await this.repository.update(user);
        });
    }
}
