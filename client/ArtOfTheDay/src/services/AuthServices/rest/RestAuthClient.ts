import {AuthTokens} from '@/src/domain/Auth';
import {LoginCommand, RegisterCommand} from '@/src/services/AuthServices/AuthCommands';
import {IAuthClient} from '@/src/services/AuthServices/IAuthClient';
import {API_CONFIG} from '@/src/config/apiConfig';
import {restPost} from '@/src/services/rest/restFetch';

type AuthResponse = {accessToken: string; refreshToken: string};

const BASE = API_CONFIG.identityService;

export class RestAuthClient implements IAuthClient {
    async login(command: LoginCommand): Promise<AuthTokens> {
        const res = await restPost<LoginCommand, AuthResponse>(
            `${BASE}/api/authentication/login`,
            command,
        );
        return new AuthTokens(res.accessToken, res.refreshToken);
    }

    async register(command: RegisterCommand): Promise<AuthTokens> {
        const res = await restPost<RegisterCommand, AuthResponse>(
            `${BASE}/api/authentication/register`,
            command,
        );
        return new AuthTokens(res.accessToken, res.refreshToken);
    }

    async refresh(refreshToken: string): Promise<AuthTokens> {
        const res = await restPost<{refreshToken: string}, AuthResponse>(
            `${BASE}/api/authentication/refresh`,
            {refreshToken},
        );
        return new AuthTokens(res.accessToken, res.refreshToken);
    }
}
