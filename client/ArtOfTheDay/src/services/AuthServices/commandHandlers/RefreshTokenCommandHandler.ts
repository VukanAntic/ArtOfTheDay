import {IRepository} from '@/src/repositories/IRepository';
import {AuthTokens} from '@/src/domain/Auth';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IAuthClient} from '@/src/services/AuthServices/IAuthClient';

export class RefreshTokenCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IAuthClient,
        private readonly repository: IRepository<AuthTokens>,
    ) {
        super();
    }

    async handle(): Promise<void> {
        await this.timed('RefreshTokenCommand', async () => {
            const current = await this.repository.get();
            if (!current) throw new Error('No tokens available to refresh');
            const tokens = await this.client.refresh(current.refreshToken);
            await this.repository.update(tokens);
        });
    }
}
