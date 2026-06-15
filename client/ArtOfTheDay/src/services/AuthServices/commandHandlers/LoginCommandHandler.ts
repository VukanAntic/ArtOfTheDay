import {IRepository} from '@/src/repositories/IRepository';
import {AuthTokens} from '@/src/domain/Auth';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IAuthClient} from '@/src/services/AuthServices/IAuthClient';
import {LoginCommand} from '@/src/services/AuthServices/AuthCommands';

export class LoginCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IAuthClient,
        private readonly repository: IRepository<AuthTokens>,
    ) {
        super();
    }

    async handle(command: LoginCommand): Promise<void> {
        await this.timed('LoginCommand', async () => {
            const tokens = await this.client.login(command);
            await this.repository.update(tokens);
        });
    }
}
