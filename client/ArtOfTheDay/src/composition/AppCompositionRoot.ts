import {CURRENT_PROTOCOL} from '@/src/config/apiProtocol';
import {createAuthClient} from '@/src/services/AuthServices/createAuthClient';
import {createImageClient} from '@/src/services/ImageServices/createImageClient';
import {createPreferenceClient} from '@/src/services/PreferenceServices/createPreferenceClient';
import {createTutorialClient} from '@/src/services/TutorialServices/createTutorialClient';
import {createNextImageClient} from '@/src/services/NextImageServices/createNextImageClient';
import {CachedRepository} from '@/src/repositories/CachedRepository';
import {SecureRepository} from '@/src/repositories/SecureRepository';
import {InMemoryRepository} from '@/src/repositories/InMemoryRepository';
import {AuthTokens} from '@/src/domain/Auth';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {SeenImageData} from '@/src/domain/SeenImageData';
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
import {GetPreferencesCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/GetPreferencesCommandHandler';
import {AddLikedArtworkCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/AddLikedArtworkCommandHandler';
import {RemoveLikedArtworkCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/RemoveLikedArtworkCommandHandler';
import {AddLikedGenreCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/AddLikedGenreCommandHandler';
import {RemoveLikedGenreCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/RemoveLikedGenreCommandHandler';
import {AddLikedArtistCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/AddLikedArtistCommandHandler';
import {RemoveLikedArtistCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/RemoveLikedArtistCommandHandler';
import {AddDislikedArtworkCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/AddDislikedArtworkCommandHandler';
import {RemoveDislikedArtworkCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/RemoveDislikedArtworkCommandHandler';
import {FtueCompleteCommandHandler} from '@/src/services/TutorialServices/commandHandlers/FtueCompleteCommandHandler';
import {GetHistoryCommandHandler} from '@/src/services/NextImageServices/commandHandlers/GetHistoryCommandHandler';

const authClient = createAuthClient(CURRENT_PROTOCOL);
const imageClient = createImageClient(CURRENT_PROTOCOL);
const preferenceClient = createPreferenceClient(CURRENT_PROTOCOL);
const tutorialClient = createTutorialClient(CURRENT_PROTOCOL);
const nextImageClient = createNextImageClient(CURRENT_PROTOCOL);

export const authRepository = new CachedRepository<AuthTokens>(
    new SecureRepository<AuthTokens>('auth_tokens'),
);
export const preferencesRepository = new InMemoryRepository<UserPreferencesData>();

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

export const getPreferencesCommandHandler = new GetPreferencesCommandHandler(preferenceClient, preferencesRepository);
export const addLikedArtworkCommandHandler = new AddLikedArtworkCommandHandler(preferenceClient, preferencesRepository);
export const removeLikedArtworkCommandHandler = new RemoveLikedArtworkCommandHandler(preferenceClient, preferencesRepository);
export const addLikedGenreCommandHandler = new AddLikedGenreCommandHandler(preferenceClient, preferencesRepository);
export const removeLikedGenreCommandHandler = new RemoveLikedGenreCommandHandler(preferenceClient, preferencesRepository);
export const addLikedArtistCommandHandler = new AddLikedArtistCommandHandler(preferenceClient, preferencesRepository);
export const removeLikedArtistCommandHandler = new RemoveLikedArtistCommandHandler(preferenceClient, preferencesRepository);
export const addDislikedArtworkCommandHandler = new AddDislikedArtworkCommandHandler(preferenceClient, preferencesRepository);
export const removeDislikedArtworkCommandHandler = new RemoveDislikedArtworkCommandHandler(preferenceClient, preferencesRepository);

export const ftueCompleteCommandHandler = new FtueCompleteCommandHandler(tutorialClient);

export const historyRepository = new InMemoryRepository<SeenImageData[]>();
export const getHistoryCommandHandler = new GetHistoryCommandHandler(nextImageClient, historyRepository);
