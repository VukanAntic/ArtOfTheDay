import {IRepository} from '@/src/repositories/IRepository';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {SeenImageData} from '@/src/domain/SeenImageData';
import {GetPreferencesCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/GetPreferencesCommandHandler';
import {GetArtworksFromIdsCommandHandler} from '@/src/services/ImageServices/commandHandlers/GetArtworksFromIdsCommandHandler';
import {GetAllGenresCommandHandler} from '@/src/services/ImageServices/commandHandlers/GetAllGenresCommandHandler';
import {GetAllArtistsCommandHandler} from '@/src/services/ImageServices/commandHandlers/GetAllArtistsCommandHandler';
import UserProfileViewData from '@/src/components/UserProfile/UserProfileViewData';
import LikedArtScreenViewData from '@/src/components/LikedArtScreen/LikedArtScreenViewData';
import SettingsScreenViewData from '@/src/components/SettingsScreen/SettingsScreenViewData';
import {ArtistData} from '@/src/domain/ArtistData';

const MOCK_ARTISTS: ArtistData[] = [
    new ArtistData(1, 'Claude Monet'),
    new ArtistData(2, 'Vincent van Gogh'),
    new ArtistData(3, 'Pablo Picasso'),
    new ArtistData(4, 'Rembrandt van Rijn'),
];

export class UserProfileController {
    constructor(
        private readonly getPreferencesHandler: GetPreferencesCommandHandler,
        private readonly getArtworksFromIdsHandler: GetArtworksFromIdsCommandHandler,
        private readonly getAllGenresHandler: GetAllGenresCommandHandler,
        private readonly getAllArtistsHandler: GetAllArtistsCommandHandler,
        private readonly getValidToken: () => Promise<string | null>,
        private readonly preferencesRepository: IRepository<UserPreferencesData>,
        private readonly historyRepository: IRepository<SeenImageData[]>,
    ) {}

    async loadProfile(): Promise<UserProfileViewData | null> {
        const token = await this.getValidToken();
        if (!token) return null;

        await this.getPreferencesHandler.handle({});
        const preferences = await this.preferencesRepository.get();
        if (!preferences) return null;

        const [likedArtworks, allGenres, allArtists, history] = await Promise.all([
            preferences.likedArtworkIds.length > 0
                ? this.getArtworksFromIdsHandler.handle({artworkIds: preferences.likedArtworkIds})
                : Promise.resolve([]),
            this.getAllGenresHandler.handle(),
            Promise.resolve(MOCK_ARTISTS),
            this.historyRepository.get().then(h => h ?? []),
        ]);

        const backgroundImageUrl = likedArtworks[0]?.imageUrl ?? null;

        return new UserProfileViewData(
            new LikedArtScreenViewData(likedArtworks, history),
            new SettingsScreenViewData(allGenres, allArtists, preferences.likedGenreIds, preferences.likedArtistIds),
            backgroundImageUrl,
        );
    }
}
