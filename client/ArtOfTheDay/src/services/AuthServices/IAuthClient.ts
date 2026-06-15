import {AuthTokens} from '@/src/domain/Auth';
import {LoginCommand, RegisterCommand} from './AuthCommands';

export interface IAuthClient {
    login(command: LoginCommand): Promise<AuthTokens>;
    register(command: RegisterCommand): Promise<AuthTokens>;
    refresh(refreshToken: string): Promise<AuthTokens>;
}
