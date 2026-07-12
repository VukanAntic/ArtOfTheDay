import {IRepository} from '@/src/repositories/IRepository';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {SeenImageData} from '@/src/domain/SeenImageData';
import {ArtworkData} from '@/src/domain/ArtworkData';
import {AllArtworksData} from '@/src/domain/AllArtworksData';
import {GenreData} from '@/src/domain/GenreData';
import {ArtistData} from '@/src/domain/ArtistData';
import UserProfileViewData from '@/src/components/UserProfile/UserProfileViewData';
import LikedArtScreenViewData from '@/src/components/LikedArtScreen/LikedArtScreenViewData';
import SettingsScreenViewData from '@/src/components/SettingsScreen/SettingsScreenViewData';

export class UserProfileController {
    constructor(
        private readonly preferencesRepository: IRepository<UserPreferencesData>,
        private readonly artworkRepository: IRepository<AllArtworksData>,
        private readonly genresRepository: IRepository<GenreData[]>,
        private readonly artistsRepository: IRepository<ArtistData[]>,
        private readonly historyRepository: IRepository<SeenImageData[]>,
    ) {}

    async loadProfile(): Promise<UserProfileViewData | null> {
        const preferences = await this.preferencesRepository.get();
        if (!preferences) return null;

        const allArtworks = await this.artworkRepository.get();
        const likedArtworks = preferences.likedArtworkIds
            .map(id => allArtworks?.getById(id))
            .filter((a): a is ArtworkData => a !== undefined);
        const allGenres = await this.genresRepository.get() ?? [];
        const allArtists = await this.artistsRepository.get() ?? [];
        const history = await this.historyRepository.get() ?? [];

        const backgroundImageUrl = likedArtworks[0]?.imageUrl ?? null;

        return new UserProfileViewData(
            new LikedArtScreenViewData(likedArtworks, history),
            new SettingsScreenViewData(allGenres, allArtists, preferences.likedGenreIds, preferences.likedArtistIds),
            backgroundImageUrl,
        );
    }
}
