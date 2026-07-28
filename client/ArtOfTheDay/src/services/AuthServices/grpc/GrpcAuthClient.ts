import {createClient} from '@connectrpc/connect';
import {AuthTokens} from '@/src/domain/Auth';
import {LoginCommand, RegisterCommand} from '@/src/services/AuthServices/AuthCommands';
import {IAuthClient} from '@/src/services/AuthServices/IAuthClient';
import {AuthGrpcService} from '@/src/services/grpc/gen/auth_pb';
import {grpcTransport} from '@/src/services/grpc/grpcTransport';

export class GrpcAuthClient implements IAuthClient {
    private readonly client = createClient(AuthGrpcService, grpcTransport);

    async login(command: LoginCommand): Promise<AuthTokens> {
        const res = await this.client.login({username: command.username, password: command.password});
        return new AuthTokens(res.accessToken, res.refreshToken);
    }

    async register(command: RegisterCommand): Promise<AuthTokens> {
        const res = await this.client.register({
            username: command.username,
            email: command.email,
            password: command.password,
            confirmPassword: command.confirmPassword,
            firstName: command.firstName,
            lastName: command.lastName,
        });
        return new AuthTokens(res.accessToken, res.refreshToken);
    }

    async refresh(refreshToken: string): Promise<AuthTokens> {
        const res = await this.client.refresh({refreshToken});
        return new AuthTokens(res.accessToken, res.refreshToken);
    }
}
