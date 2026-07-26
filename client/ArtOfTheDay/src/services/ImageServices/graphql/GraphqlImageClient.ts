import {ArtworkData} from '@/src/domain/ArtworkData';
import {ArtistData} from '@/src/domain/ArtistData';
import {GenreData} from '@/src/domain/GenreData';
import {IdentityArtworkData} from '@/src/domain/IdentityArtworkData';
import {IImageClient} from '@/src/services/ImageServices/IImageClient';
import {
    GetAllArtistsFromIdsCommand,
    GetAllGenresFromIdsCommand,
    GetArtworksFromArtistCommand,
    GetArtworksFromGenreCommand,
    GetArtworksFromIdsCommand,
    GetRandomArtworkIdCommand,
    GetRandomArtworksCommand,
} from '@/src/services/ImageServices/ImageCommands';
import {API_CONFIG} from '@/src/config/apiConfig';
import {graphqlRequest} from '@/src/services/graphql/graphqlFetch';

type ArtworkDTO = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    artist: {id: number; name: string};
    genres: {id: string; name: string}[];
};

type IdentityArtworkDTO = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
};

type GenreDTO = {id: string; name: string};
type ArtistDTO = {id: number; name: string};

const ENDPOINT = `${API_CONFIG.imageService}/graphql`;

const ARTWORK_FIELDS = `id title description imageUrl artist { id name } genres { id name }`;
const IDENTITY_ARTWORK_FIELDS = `id title description imageUrl`;

function toArtwork(dto: ArtworkDTO): ArtworkData {
    return new ArtworkData(
        dto.id,
        dto.title,
        dto.description,
        dto.imageUrl,
        new ArtistData(dto.artist.id, dto.artist.name),
        dto.genres.map(g => new GenreData(g.id, g.name)),
    );
}

function toIdentityArtwork(dto: IdentityArtworkDTO): IdentityArtworkData {
    return new IdentityArtworkData(dto.id, dto.title, dto.description, dto.imageUrl);
}

export class GraphqlImageClient implements IImageClient {
    async getAllArtworks(): Promise<ArtworkData[]> {
        const data = await graphqlRequest<{allArtworks: ArtworkDTO[]}>(
            ENDPOINT,
            `query { allArtworks { ${ARTWORK_FIELDS} } }`,
        );
        return data.allArtworks.map(toArtwork);
    }

    async getArtworksFromIds(command: GetArtworksFromIdsCommand): Promise<ArtworkData[]> {
        const data = await graphqlRequest<{artworksFromIds: ArtworkDTO[]}>(
            ENDPOINT,
            `query($ids: [Int!]!) { artworksFromIds(ids: $ids) { ${ARTWORK_FIELDS} } }`,
            {ids: command.artworkIds},
        );
        return data.artworksFromIds.map(toArtwork);
    }

    async getArtworksFromGenre(command: GetArtworksFromGenreCommand): Promise<IdentityArtworkData[]> {
        const data = await graphqlRequest<{artworksFromGenre: IdentityArtworkDTO[]}>(
            ENDPOINT,
            `query($genreId: ID!) { artworksFromGenre(genreId: $genreId) { ${IDENTITY_ARTWORK_FIELDS} } }`,
            {genreId: command.genreId},
        );
        return data.artworksFromGenre.map(toIdentityArtwork);
    }

    async getArtworksFromArtist(command: GetArtworksFromArtistCommand): Promise<IdentityArtworkData[]> {
        const data = await graphqlRequest<{artworksFromArtist: IdentityArtworkDTO[]}>(
            ENDPOINT,
            `query($artistId: Int!) { artworksFromArtist(artistId: $artistId) { ${IDENTITY_ARTWORK_FIELDS} } }`,
            {artistId: command.artistId},
        );
        return data.artworksFromArtist.map(toIdentityArtwork);
    }

    async getAllGenres(): Promise<GenreData[]> {
        const data = await graphqlRequest<{allGenres: GenreDTO[]}>(
            ENDPOINT,
            `query { allGenres { id name } }`,
        );
        return data.allGenres.map(g => new GenreData(g.id, g.name));
    }

    async getAllArtists(): Promise<ArtistData[]> {
        const data = await graphqlRequest<{allArtists: ArtistDTO[]}>(
            ENDPOINT,
            `query { allArtists { id name } }`,
        );
        return data.allArtists.map(a => new ArtistData(a.id, a.name));
    }

    async getAllGenresFromIds(command: GetAllGenresFromIdsCommand): Promise<GenreData[]> {
        const data = await graphqlRequest<{genresFromIds: GenreDTO[]}>(
            ENDPOINT,
            `query($ids: [ID!]!) { genresFromIds(ids: $ids) { id name } }`,
            {ids: command.genreIds},
        );
        return data.genresFromIds.map(g => new GenreData(g.id, g.name));
    }

    async getAllArtistsFromIds(command: GetAllArtistsFromIdsCommand): Promise<ArtistData[]> {
        const data = await graphqlRequest<{artistsFromIds: ArtistDTO[]}>(
            ENDPOINT,
            `query($ids: [Int!]!) { artistsFromIds(ids: $ids) { id name } }`,
            {ids: command.artistIds},
        );
        return data.artistsFromIds.map(a => new ArtistData(a.id, a.name));
    }

    async getRandomArtworkId(command: GetRandomArtworkIdCommand): Promise<number> {
        const data = await graphqlRequest<{randomArtworkId: number | null}>(
            ENDPOINT,
            `query($excludeIds: [Int!]) { randomArtworkId(excludeIds: $excludeIds) }`,
            {excludeIds: command.excludeIds},
        );
        if (data.randomArtworkId == null) {
            throw new Error('No artwork found');
        }
        return data.randomArtworkId;
    }

    async getRandomArtworks(command: GetRandomArtworksCommand): Promise<ArtworkData[]> {
        const data = await graphqlRequest<{randomArtworks: ArtworkDTO[]}>(
            ENDPOINT,
            `query($count: Int!) { randomArtworks(count: $count) { ${ARTWORK_FIELDS} } }`,
            {count: command.count},
        );
        return data.randomArtworks.map(toArtwork);
    }
}
