import {CURRENT_PROTOCOL} from '@/src/config/apiProtocol';
import {createAuthClient} from '@/src/services/AuthServices/createAuthClient';
import {CachedRepository} from '@/src/repositories/CachedRepository';
import {SecureRepository} from '@/src/repositories/SecureRepository';
import {AuthTokens} from '@/src/domain/Auth';
import {LoginCommandHandler} from '@/src/services/AuthServices/commandHandlers/LoginCommandHandler';
import {RegisterCommandHandler} from '@/src/services/AuthServices/commandHandlers/RegisterCommandHandler';
import {RefreshTokenCommandHandler} from '@/src/services/AuthServices/commandHandlers/RefreshTokenCommandHandler';

const authClient = createAuthClient(CURRENT_PROTOCOL);

export const authRepository = new CachedRepository<AuthTokens>(
    new SecureRepository<AuthTokens>('auth_tokens'),
);

export const loginCommandHandler = new LoginCommandHandler(authClient, authRepository);
export const registerCommandHandler = new RegisterCommandHandler(authClient, authRepository);
export const refreshTokenCommandHandler = new RefreshTokenCommandHandler(authClient, authRepository);
