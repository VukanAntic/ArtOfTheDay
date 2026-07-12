import {IRepository} from '@/src/repositories/IRepository';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {SeenImageData} from '@/src/domain/SeenImageData';
import {ArtworkData} from '@/src/domain/ArtworkData';
import {AllArtworksData} from '@/src/domain/AllArtworksData';
import {GenreData} from '@/src/domain/GenreData';
import {ArtistData} from '@/src/domain/ArtistData';
import {AddLikedGenreCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/AddLikedGenreCommandHandler';
import {RemoveLikedGenreCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/RemoveLikedGenreCommandHandler';
import {AddLikedArtistCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/AddLikedArtistCommandHandler';
import {RemoveLikedArtistCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/RemoveLikedArtistCommandHandler';
import UserProfileViewData from '@/src/components/UserProfile/UserProfileViewData';
import LikedArtScreenViewData from '@/src/components/LikedArtScreen/LikedArtScreenViewData';
import SettingsScreenViewData from '@/src/components/SettingsScreen/SettingsScreenViewData';

export class LikeGenreIntent {
    constructor(readonly name: string) {}
}

export class UnlikeGenreIntent {
    constructor(readonly name: string) {}
}

export class LikeArtistIntent {
    constructor(readonly name: string) {}
}

export class UnlikeArtistIntent {
    constructor(readonly name: string) {}
}

export type SettingsPreferenceIntent =
    | LikeGenreIntent
    | UnlikeGenreIntent
    | LikeArtistIntent
    | UnlikeArtistIntent;

export class UserProfileController {
    constructor(
        private readonly preferencesRepository: IRepository<UserPreferencesData>,
        private readonly artworkRepository: IRepository<AllArtworksData>,
        private readonly genresRepository: IRepository<GenreData[]>,
        private readonly artistsRepository: IRepository<ArtistData[]>,
        private readonly historyRepository: IRepository<SeenImageData[]>,
        private readonly addLikedGenreHandler: AddLikedGenreCommandHandler,
        private readonly removeLikedGenreHandler: RemoveLikedGenreCommandHandler,
        private readonly addLikedArtistHandler: AddLikedArtistCommandHandler,
        private readonly removeLikedArtistHandler: RemoveLikedArtistCommandHandler,
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

    dispatch(intent: SettingsPreferenceIntent): void {
        this.handleIntent(intent)
            .catch(e => console.error('[Profile] preference intent failed:', e));
    }

    private async handleIntent(intent: SettingsPreferenceIntent): Promise<void> {
        if (intent instanceof LikeGenreIntent) return this.setGenre(intent.name, true);
        if (intent instanceof UnlikeGenreIntent) return this.setGenre(intent.name, false);
        if (intent instanceof LikeArtistIntent) return this.setArtist(intent.name, true);
        if (intent instanceof UnlikeArtistIntent) return this.setArtist(intent.name, false);
    }

    private async setGenre(name: string, liked: boolean): Promise<void> {
        const genres = await this.genresRepository.get() ?? [];
        const genre = genres.find(g => g.name === name);
        if (!genre) return;
        if (liked) {
            await this.addLikedGenreHandler.handle({genreId: genre.id});
        } else {
            await this.removeLikedGenreHandler.handle({genreId: genre.id});
        }
    }

    private async setArtist(name: string, liked: boolean): Promise<void> {
        const artists = await this.artistsRepository.get() ?? [];
        const artist = artists.find(a => a.name === name);
        if (!artist) return;
        if (liked) {
            await this.addLikedArtistHandler.handle({artistId: artist.id});
        } else {
            await this.removeLikedArtistHandler.handle({artistId: artist.id});
        }
    }
}
