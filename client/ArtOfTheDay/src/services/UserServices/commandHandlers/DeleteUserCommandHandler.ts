import {IRepository} from '@/src/repositories/IRepository';
import {AuthTokens} from '@/src/domain/Auth';
import {UserData} from '@/src/domain/UserData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IUserClient} from '@/src/services/UserServices/IUserClient';
import {DeleteUserCommand} from '@/src/services/UserServices/UserCommands';

export class DeleteUserCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IUserClient,
        private readonly authRepository: IRepository<AuthTokens>,
        private readonly userRepository: IRepository<UserData>,
    ) {
        super();
    }

    async handle(command: DeleteUserCommand): Promise<void> {
        await this.timed('DeleteUser', async () => {
            await this.client.deleteUser(command.username);
            await this.authRepository.update(null);
            await this.userRepository.update(null);
        });
    }
}
