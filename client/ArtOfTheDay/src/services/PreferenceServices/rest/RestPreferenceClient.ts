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
import {API_CONFIG} from '@/src/config/apiConfig';
import {restGet, restPut} from '@/src/services/rest/restFetch';

type UserPreferencesDTO = {
    username: string;
    likedArtworkIds: number[];
    likedGenreIds: string[];
    dislikedArtworksIds: number[];
    likedArtistIds: number[];
};

const BASE = `${API_CONFIG.preferenceService}/api/preference`;

function toUserPreferences(dto: UserPreferencesDTO): UserPreferencesData {
    return new UserPreferencesData(
        dto.username,
        dto.likedArtworkIds,
        dto.likedGenreIds,
        dto.dislikedArtworksIds,
        dto.likedArtistIds,
    );
}

export class RestPreferenceClient implements IPreferenceClient {
    async getPreferences(token: string): Promise<UserPreferencesData> {
        const res = await restGet<UserPreferencesDTO>(`${BASE}/get`, token);
        return toUserPreferences(res);
    }

    async addLikedArtwork(command: AddLikedArtworkCommand): Promise<void> {
        await restPut(`${BASE}/add-liked-artwork`, {artworkId: command.artworkId}, command.token);
    }

    async removeLikedArtwork(command: RemoveLikedArtworkCommand): Promise<void> {
        await restPut(`${BASE}/remove-liked-artwork`, {artworkId: command.artworkId}, command.token);
    }

    async addLikedGenre(command: AddLikedGenreCommand): Promise<void> {
        await restPut(`${BASE}/add-liked-genre`, {genreId: command.genreId}, command.token);
    }

    async removeLikedGenre(command: RemoveLikedGenreCommand): Promise<void> {
        await restPut(`${BASE}/remove-liked-genre`, {genreId: command.genreId}, command.token);
    }

    async addLikedArtist(command: AddLikedArtistCommand): Promise<void> {
        await restPut(`${BASE}/add-liked-artist`, {artistId: command.artistId}, command.token);
    }

    async removeLikedArtist(command: RemoveLikedArtistCommand): Promise<void> {
        await restPut(`${BASE}/remove-liked-artist`, {artistId: command.artistId}, command.token);
    }

    async addDislikedArtwork(command: AddDislikedArtworkCommand): Promise<void> {
        await restPut(`${BASE}/add-disliked-artwork`, {artworkId: command.artworkId}, command.token);
    }

    async removeDislikedArtwork(command: RemoveDislikedArtworkCommand): Promise<void> {
        await restPut(`${BASE}/remove-disliked-artwork`, {artworkId: command.artworkId}, command.token);
    }
}
