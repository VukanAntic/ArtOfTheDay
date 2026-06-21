import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {IPreferenceClient} from '@/src/services/PreferenceServices/IPreferenceClient';
import {
    AddDislikedArtworkCommand,
    AddLikedArtistCommand,
    AddLikedArtworkCommand,
    AddLikedGenreCommand,
    RemoveDislikedArtworkCommand,
    RemoveLikedArtistCommand,
    RemoveLikedArtworkCommand,
    RemoveLikedGenreCommand,
} from '@/src/services/PreferenceServices/PreferenceCommands';

export class GrpcPreferenceClient implements IPreferenceClient {
    getPreferences(_token: string): Promise<UserPreferencesData> {
        throw new Error('gRPC not yet implemented');
    }
    addLikedArtwork(_command: AddLikedArtworkCommand): Promise<void> {
        throw new Error('gRPC not yet implemented');
    }
    removeLikedArtwork(_command: RemoveLikedArtworkCommand): Promise<void> {
        throw new Error('gRPC not yet implemented');
    }
    addLikedGenre(_command: AddLikedGenreCommand): Promise<void> {
        throw new Error('gRPC not yet implemented');
    }
    removeLikedGenre(_command: RemoveLikedGenreCommand): Promise<void> {
        throw new Error('gRPC not yet implemented');
    }
    addLikedArtist(_command: AddLikedArtistCommand): Promise<void> {
        throw new Error('gRPC not yet implemented');
    }
    removeLikedArtist(_command: RemoveLikedArtistCommand): Promise<void> {
        throw new Error('gRPC not yet implemented');
    }
    addDislikedArtwork(_command: AddDislikedArtworkCommand): Promise<void> {
        throw new Error('gRPC not yet implemented');
    }
    removeDislikedArtwork(_command: RemoveDislikedArtworkCommand): Promise<void> {
        throw new Error('gRPC not yet implemented');
    }
}
