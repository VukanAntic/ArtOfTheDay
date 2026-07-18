import {IRepository} from '@/src/repositories/IRepository';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {SeenImageData} from '@/src/domain/SeenImageData';
import {ArtworkData} from '@/src/domain/ArtworkData';
import {AllArtworksData} from '@/src/domain/AllArtworksData';
import {GenreData} from '@/src/domain/GenreData';
import {ArtistData} from '@/src/domain/ArtistData';
import {UserData} from '@/src/domain/UserData';
import {AddLikedGenreCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/AddLikedGenreCommandHandler';
import {RemoveLikedGenreCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/RemoveLikedGenreCommandHandler';
import {AddLikedArtistCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/AddLikedArtistCommandHandler';
import {RemoveLikedArtistCommandHandler} from '@/src/services/PreferenceServices/commandHandlers/RemoveLikedArtistCommandHandler';
import {ChangeNameCommandHandler} from '@/src/services/UserServices/commandHandlers/ChangeNameCommandHandler';
import {ChangeEmailCommandHandler} from '@/src/services/UserServices/commandHandlers/ChangeEmailCommandHandler';
import {ChangePasswordCommandHandler} from '@/src/services/UserServices/commandHandlers/ChangePasswordCommandHandler';
import {DeleteUserCommandHandler} from '@/src/services/UserServices/commandHandlers/DeleteUserCommandHandler';
import UserProfileViewData from '@/src/components/UserProfile/UserProfileViewData';
import LikedArtScreenViewData from '@/src/components/LikedArtScreen/LikedArtScreenViewData';
import PersonalScreenViewData from '@/src/components/PersonalScreen/PersonalScreenViewData';

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

export class ChangeNameIntent {
    constructor(readonly firstName: string, readonly lastName: string) {}
}

export class ChangeEmailIntent {
    constructor(readonly email: string) {}
}

export class ChangePasswordIntent {
    constructor(readonly oldPassword: string, readonly newPassword: string) {}
}

export class DeleteAccountIntent {}

export type SettingsPreferenceIntent = LikeGenreIntent | UnlikeGenreIntent | LikeArtistIntent | UnlikeArtistIntent;
export type AccountIntent = ChangeNameIntent | ChangeEmailIntent | ChangePasswordIntent | DeleteAccountIntent;
export type UserProfileIntent = SettingsPreferenceIntent | AccountIntent;

export class UserProfileController {
    constructor(
        private readonly preferencesRepository: IRepository<UserPreferencesData>,
        private readonly artworkRepository: IRepository<AllArtworksData>,
        private readonly genresRepository: IRepository<GenreData[]>,
        private readonly artistsRepository: IRepository<ArtistData[]>,
        private readonly historyRepository: IRepository<SeenImageData[]>,
        private readonly userRepository: IRepository<UserData>,
        private readonly addLikedGenreHandler: AddLikedGenreCommandHandler,
        private readonly removeLikedGenreHandler: RemoveLikedGenreCommandHandler,
        private readonly addLikedArtistHandler: AddLikedArtistCommandHandler,
        private readonly removeLikedArtistHandler: RemoveLikedArtistCommandHandler,
        private readonly changeNameHandler: ChangeNameCommandHandler,
        private readonly changeEmailHandler: ChangeEmailCommandHandler,
        private readonly changePasswordHandler: ChangePasswordCommandHandler,
        private readonly deleteUserHandler: DeleteUserCommandHandler,
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
        const user = await this.userRepository.get();

        const backgroundImageUrl = likedArtworks[0]?.imageUrl ?? null;

        return new UserProfileViewData(
            new LikedArtScreenViewData(likedArtworks, history),
            new PersonalScreenViewData(allGenres, allArtists, preferences.likedGenreIds, preferences.likedArtistIds),
            user,
            backgroundImageUrl,
        );
    }

    dispatch(intent: UserProfileIntent): void {
        this.handleIntent(intent)
            .catch(e => console.error('[Profile] intent failed:', e));
    }

    private async handleIntent(intent: UserProfileIntent): Promise<void> {
        if (intent instanceof LikeGenreIntent) return this.setGenre(intent.name, true);
        if (intent instanceof UnlikeGenreIntent) return this.setGenre(intent.name, false);
        if (intent instanceof LikeArtistIntent) return this.setArtist(intent.name, true);
        if (intent instanceof UnlikeArtistIntent) return this.setArtist(intent.name, false);
        if (intent instanceof ChangeNameIntent) return this.changeNameHandler.handle({newFirstName: intent.firstName, newLastName: intent.lastName});
        if (intent instanceof ChangeEmailIntent) return this.changeEmailHandler.handle({newEmail: intent.email});
        if (intent instanceof ChangePasswordIntent) return this.changePasswordHandler.handle({oldPassword: intent.oldPassword, newPassword: intent.newPassword});
        if (intent instanceof DeleteAccountIntent) return this.deleteAccount();
    }

    private async deleteAccount(): Promise<void> {
        const user = await this.userRepository.get();
        if (!user) return;
        await this.deleteUserHandler.handle({username: user.username});
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
