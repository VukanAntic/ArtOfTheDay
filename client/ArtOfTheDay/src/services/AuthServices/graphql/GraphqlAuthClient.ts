import {AuthTokens} from '@/src/domain/Auth';
import {LoginCommand, RegisterCommand} from '@/src/services/AuthServices/AuthCommands';
import {IAuthClient} from '@/src/services/AuthServices/IAuthClient';
import {API_CONFIG} from '@/src/config/apiConfig';
import {graphqlRequest} from '@/src/services/graphql/graphqlFetch';

type AuthResponse = {accessToken: string; refreshToken: string};

const ENDPOINT = `${API_CONFIG.identityService}/graphql`;

export class GraphqlAuthClient implements IAuthClient {
    async login(command: LoginCommand): Promise<AuthTokens> {
        const data = await graphqlRequest<{login: AuthResponse}>(
            ENDPOINT,
            `mutation($username: String!, $password: String!) {
                login(username: $username, password: $password) { accessToken refreshToken }
            }`,
            {username: command.username, password: command.password},
        );
        return new AuthTokens(data.login.accessToken, data.login.refreshToken);
    }

    async register(command: RegisterCommand): Promise<AuthTokens> {
        const data = await graphqlRequest<{register: AuthResponse}>(
            ENDPOINT,
            `mutation($username: String!, $email: String!, $password: String!, $confirmPassword: String!, $firstName: String!, $lastName: String!) {
                register(username: $username, email: $email, password: $password, confirmPassword: $confirmPassword, firstName: $firstName, lastName: $lastName) {
                    accessToken refreshToken
                }
            }`,
            {
                username: command.username,
                email: command.email,
                password: command.password,
                confirmPassword: command.confirmPassword,
                firstName: command.firstName,
                lastName: command.lastName,
            },
        );
        return new AuthTokens(data.register.accessToken, data.register.refreshToken);
    }

    async refresh(refreshToken: string): Promise<AuthTokens> {
        const data = await graphqlRequest<{refresh: AuthResponse}>(
            ENDPOINT,
            `mutation($refreshToken: String!) {
                refresh(refreshToken: $refreshToken) { accessToken refreshToken }
            }`,
            {refreshToken},
        );
        return new AuthTokens(data.refresh.accessToken, data.refresh.refreshToken);
    }
}
