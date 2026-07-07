import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {
    AddDislikedArtworkCommand,
    AddLikedArtistCommand,
    AddLikedArtworkCommand,
    AddLikedGenreCommand,
    RemoveDislikedArtworkCommand,
    RemoveLikedArtistCommand,
    RemoveLikedArtworkCommand,
    RemoveLikedGenreCommand,
} from './PreferenceCommands';

export interface IPreferenceClient {
    getPreferences(): Promise<UserPreferencesData>;
    addLikedArtwork(command: AddLikedArtworkCommand): Promise<void>;
    removeLikedArtwork(command: RemoveLikedArtworkCommand): Promise<void>;
    addLikedGenre(command: AddLikedGenreCommand): Promise<void>;
    removeLikedGenre(command: RemoveLikedGenreCommand): Promise<void>;
    addLikedArtist(command: AddLikedArtistCommand): Promise<void>;
    removeLikedArtist(command: RemoveLikedArtistCommand): Promise<void>;
    addDislikedArtwork(command: AddDislikedArtworkCommand): Promise<void>;
    removeDislikedArtwork(command: RemoveDislikedArtworkCommand): Promise<void>;
}
