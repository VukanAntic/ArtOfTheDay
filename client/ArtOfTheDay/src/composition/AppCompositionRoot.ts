import {CURRENT_PROTOCOL} from '@/src/config/apiProtocol';
import {createAuthClient} from '@/src/services/AuthServices/createAuthClient';
import {createImageClient} from '@/src/services/ImageServices/createImageClient';
import {CachedRepository} from '@/src/repositories/CachedRepository';
import {SecureRepository} from '@/src/repositories/SecureRepository';
import {AuthTokens} from '@/src/domain/Auth';
import {LoginCommandHandler} from '@/src/services/AuthServices/commandHandlers/LoginCommandHandler';
import {RegisterCommandHandler} from '@/src/services/AuthServices/commandHandlers/RegisterCommandHandler';
import {RefreshTokenCommandHandler} from '@/src/services/AuthServices/commandHandlers/RefreshTokenCommandHandler';
import {GetAllGenresCommandHandler} from '@/src/services/ImageServices/commandHandlers/GetAllGenresCommandHandler';
import {GetAllArtworksCommandHandler} from '@/src/services/ImageServices/commandHandlers/GetAllArtworksCommandHandler';
import {GetAllArtistsCommandHandler} from '@/src/services/ImageServices/commandHandlers/GetAllArtistsCommandHandler';
import {GetArtworksFromIdsCommandHandler} from '@/src/services/ImageServices/commandHandlers/GetArtworksFromIdsCommandHandler';
import {GetArtworksFromGenreCommandHandler} from '@/src/services/ImageServices/commandHandlers/GetArtworksFromGenreCommandHandler';
import {GetArtworksFromArtistCommandHandler} from '@/src/services/ImageServices/commandHandlers/GetArtworksFromArtistCommandHandler';
import {GetAllGenresFromIdsCommandHandler} from '@/src/services/ImageServices/commandHandlers/GetAllGenresFromIdsCommandHandler';
import {GetAllArtistsFromIdsCommandHandler} from '@/src/services/ImageServices/commandHandlers/GetAllArtistsFromIdsCommandHandler';
import {GetRandomArtworkIdCommandHandler} from '@/src/services/ImageServices/commandHandlers/GetRandomArtworkIdCommandHandler';

const authClient = createAuthClient(CURRENT_PROTOCOL);
const imageClient = createImageClient(CURRENT_PROTOCOL);

export const authRepository = new CachedRepository<AuthTokens>(
    new SecureRepository<AuthTokens>('auth_tokens'),
);

export const loginCommandHandler = new LoginCommandHandler(authClient, authRepository);
export const registerCommandHandler = new RegisterCommandHandler(authClient, authRepository);
export const refreshTokenCommandHandler = new RefreshTokenCommandHandler(authClient, authRepository);

export const getAllGenresCommandHandler = new GetAllGenresCommandHandler(imageClient);
export const getAllArtworksCommandHandler = new GetAllArtworksCommandHandler(imageClient);
export const getAllArtistsCommandHandler = new GetAllArtistsCommandHandler(imageClient);
export const getArtworksFromIdsCommandHandler = new GetArtworksFromIdsCommandHandler(imageClient);
export const getArtworksFromGenreCommandHandler = new GetArtworksFromGenreCommandHandler(imageClient);
export const getArtworksFromArtistCommandHandler = new GetArtworksFromArtistCommandHandler(imageClient);
export const getAllGenresFromIdsCommandHandler = new GetAllGenresFromIdsCommandHandler(imageClient);
export const getAllArtistsFromIdsCommandHandler = new GetAllArtistsFromIdsCommandHandler(imageClient);
export const getRandomArtworkIdCommandHandler = new GetRandomArtworkIdCommandHandler(imageClient);
