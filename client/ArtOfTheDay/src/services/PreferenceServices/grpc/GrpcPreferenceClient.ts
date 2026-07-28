import {createClient} from '@connectrpc/connect';
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
import {PreferenceGrpcService} from '@/src/services/grpc/gen/preference_pb';
import {grpcTransport} from '@/src/services/grpc/grpcTransport';

export class GrpcPreferenceClient implements IPreferenceClient {
    private readonly client = createClient(PreferenceGrpcService, grpcTransport);

    async getPreferences(): Promise<UserPreferencesData> {
        const p = await this.client.getPreferences({});
        return new UserPreferencesData(
            p.username,
            p.likedArtworkIds.map(Number),
            p.likedGenreIds,
            p.dislikedArtworksIds.map(Number),
            p.likedArtistIds.map(Number),
        );
    }

    async addLikedArtwork(command: AddLikedArtworkCommand): Promise<void> {
        await this.client.addLikedArtwork({artworkId: BigInt(command.artworkId)});
    }

    async removeLikedArtwork(command: RemoveLikedArtworkCommand): Promise<void> {
        await this.client.removeLikedArtwork({artworkId: BigInt(command.artworkId)});
    }

    async addLikedGenre(command: AddLikedGenreCommand): Promise<void> {
        await this.client.addLikedGenre({genreId: command.genreId});
    }

    async removeLikedGenre(command: RemoveLikedGenreCommand): Promise<void> {
        await this.client.removeLikedGenre({genreId: command.genreId});
    }

    async addLikedArtist(command: AddLikedArtistCommand): Promise<void> {
        await this.client.addLikedArtist({artistId: BigInt(command.artistId)});
    }

    async removeLikedArtist(command: RemoveLikedArtistCommand): Promise<void> {
        await this.client.removeLikedArtist({artistId: BigInt(command.artistId)});
    }

    async addDislikedArtwork(command: AddDislikedArtworkCommand): Promise<void> {
        await this.client.addDislikedArtwork({artworkId: String(command.artworkId)});
    }

    async removeDislikedArtwork(command: RemoveDislikedArtworkCommand): Promise<void> {
        await this.client.removeDislikedArtwork({artworkId: String(command.artworkId)});
    }
}
