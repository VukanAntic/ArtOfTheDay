import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {IPreferenceClient} from '@/src/services/PreferenceServices/IPreferenceClient';
import {
    AddDislikedArtworkCommand,
    AddLikedArtistCommand,
    AddLikedArtworkCommand,
    AddLikedGenreCommand,
    ClearProfileArtworkCommand,
    RemoveDislikedArtworkCommand,
    RemoveLikedArtistCommand,
    RemoveLikedArtworkCommand,
    RemoveLikedGenreCommand,
    SetProfileArtworkCommand,
} from '@/src/services/PreferenceServices/PreferenceCommands';
import {API_CONFIG} from '@/src/config/apiConfig';
import {graphqlRequest} from '@/src/services/graphql/graphqlFetch';

type UserPreferencesDTO = {
    username: string;
    likedArtworkIds: number[];
    likedGenreIds: string[];
    dislikedArtworksIds: number[];
    likedArtistIds: number[];
    profileArtworkId: number | null;
};

const ENDPOINT = `${API_CONFIG.preferenceService}/graphql`;

function toUserPreferences(dto: UserPreferencesDTO): UserPreferencesData {
    return new UserPreferencesData(
        dto.username,
        dto.likedArtworkIds,
        dto.likedGenreIds,
        dto.dislikedArtworksIds,
        dto.likedArtistIds,
        dto.profileArtworkId ?? null,
    );
}

export class GraphqlPreferenceClient implements IPreferenceClient {
    async getPreferences(): Promise<UserPreferencesData> {
        const data = await graphqlRequest<{preferences: UserPreferencesDTO}>(
            ENDPOINT,
            `query { preferences { username likedArtworkIds likedGenreIds dislikedArtworksIds likedArtistIds profileArtworkId } }`,
        );
        return toUserPreferences(data.preferences);
    }

    async addLikedArtwork(command: AddLikedArtworkCommand): Promise<void> {
        await graphqlRequest(
            ENDPOINT,
            `mutation($artworkId: Int!) { addLikedArtwork(artworkId: $artworkId) }`,
            {artworkId: command.artworkId},
        );
    }

    async removeLikedArtwork(command: RemoveLikedArtworkCommand): Promise<void> {
        await graphqlRequest(
            ENDPOINT,
            `mutation($artworkId: Int!) { removeLikedArtwork(artworkId: $artworkId) }`,
            {artworkId: command.artworkId},
        );
    }

    async addLikedGenre(command: AddLikedGenreCommand): Promise<void> {
        await graphqlRequest(
            ENDPOINT,
            `mutation($genreId: ID!) { addLikedGenre(genreId: $genreId) }`,
            {genreId: command.genreId},
        );
    }

    async removeLikedGenre(command: RemoveLikedGenreCommand): Promise<void> {
        await graphqlRequest(
            ENDPOINT,
            `mutation($genreId: ID!) { removeLikedGenre(genreId: $genreId) }`,
            {genreId: command.genreId},
        );
    }

    async addLikedArtist(command: AddLikedArtistCommand): Promise<void> {
        await graphqlRequest(
            ENDPOINT,
            `mutation($artistId: Int!) { addLikedArtist(artistId: $artistId) }`,
            {artistId: command.artistId},
        );
    }

    async removeLikedArtist(command: RemoveLikedArtistCommand): Promise<void> {
        await graphqlRequest(
            ENDPOINT,
            `mutation($artistId: Int!) { removeLikedArtist(artistId: $artistId) }`,
            {artistId: command.artistId},
        );
    }

    async addDislikedArtwork(command: AddDislikedArtworkCommand): Promise<void> {
        await graphqlRequest(
            ENDPOINT,
            `mutation($artworkId: ID!) { addDislikedArtwork(artworkId: $artworkId) }`,
            {artworkId: command.artworkId},
        );
    }

    async removeDislikedArtwork(command: RemoveDislikedArtworkCommand): Promise<void> {
        await graphqlRequest(
            ENDPOINT,
            `mutation($artworkId: ID!) { removeDislikedArtwork(artworkId: $artworkId) }`,
            {artworkId: command.artworkId},
        );
    }

    async setProfileArtwork(command: SetProfileArtworkCommand): Promise<void> {
        await graphqlRequest(
            ENDPOINT,
            `mutation($artworkId: Int!) { setProfileArtwork(artworkId: $artworkId) }`,
            {artworkId: command.artworkId},
        );
    }

    async clearProfileArtwork(_command: ClearProfileArtworkCommand): Promise<void> {
        await graphqlRequest(
            ENDPOINT,
            `mutation { clearProfileArtwork }`,
        );
    }
}
