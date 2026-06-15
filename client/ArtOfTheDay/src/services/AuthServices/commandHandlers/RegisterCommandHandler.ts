import {IRepository} from '@/src/repositories/IRepository';
import {AuthTokens} from '@/src/domain/Auth';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IAuthClient} from '@/src/services/AuthServices/IAuthClient';
import {RegisterCommand} from '@/src/services/AuthServices/AuthCommands';

export class RegisterCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IAuthClient,
        private readonly repository: IRepository<AuthTokens>,
    ) {
        super();
    }

    async handle(command: RegisterCommand): Promise<void> {
        await this.timed('RegisterCommand', async () => {
            const tokens = await this.client.register(command);
            await this.repository.update(tokens);
        });
    }
}
