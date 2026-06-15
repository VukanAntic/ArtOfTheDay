import {AuthTokens} from '@/src/domain/Auth';
import {LoginCommand, RegisterCommand} from '@/src/services/AuthServices/AuthCommands';
import {IAuthClient} from '@/src/services/AuthServices/IAuthClient';

export class GraphqlAuthClient implements IAuthClient {
    login(_command: LoginCommand): Promise<AuthTokens> {
        throw new Error('GraphQL not yet implemented');
    }

    register(_command: RegisterCommand): Promise<AuthTokens> {
        throw new Error('GraphQL not yet implemented');
    }

    refresh(_refreshToken: string): Promise<AuthTokens> {
        throw new Error('GraphQL not yet implemented');
    }
}
