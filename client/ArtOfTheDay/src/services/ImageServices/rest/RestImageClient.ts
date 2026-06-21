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
} from '@/src/services/ImageServices/ImageCommands';
import {API_CONFIG} from '@/src/config/apiConfig';
import {restGet} from '@/src/services/rest/restFetch';

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

const BASE = `${API_CONFIG.imageService}/api/images`;

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

export class RestImageClient implements IImageClient {
    async getAllArtworks(): Promise<ArtworkData[]> {
        const res = await restGet<ArtworkDTO[]>(`${BASE}/get-all-artworks`);
        return res.map(toArtwork);
    }

    async getArtworksFromIds(command: GetArtworksFromIdsCommand): Promise<ArtworkData[]> {
        const res = await restGet<ArtworkDTO[]>(`${BASE}/get-artworks-from-ids?artworkIds=${command.artworkIds.join(',')}`);
        return res.map(toArtwork);
    }

    async getArtworksFromGenre(command: GetArtworksFromGenreCommand): Promise<IdentityArtworkData[]> {
        const res = await restGet<IdentityArtworkDTO[]>(`${BASE}/get-artworks-from-genre?genreId=${command.genreId}`);
        return res.map(toIdentityArtwork);
    }

    async getArtworksFromArtist(command: GetArtworksFromArtistCommand): Promise<IdentityArtworkData[]> {
        const res = await restGet<IdentityArtworkDTO[]>(`${BASE}/get-artworks-from-artist?artistId=${command.artistId}`);
        return res.map(toIdentityArtwork);
    }

    async getAllGenres(): Promise<GenreData[]> {
        const res = await restGet<GenreDTO[]>(`${BASE}/get-all-genres`);
        return res.map(g => new GenreData(g.id, g.name));
    }

    async getAllArtists(): Promise<ArtistData[]> {
        const res = await restGet<ArtistDTO[]>(`${BASE}/get-all-artists`);
        return res.map(a => new ArtistData(a.id, a.name));
    }

    async getAllGenresFromIds(command: GetAllGenresFromIdsCommand): Promise<GenreData[]> {
        const res = await restGet<GenreDTO[]>(`${BASE}/get-all-genres-from-ids?genreIds=${command.genreIds.join(',')}`);
        return res.map(g => new GenreData(g.id, g.name));
    }

    async getAllArtistsFromIds(command: GetAllArtistsFromIdsCommand): Promise<ArtistData[]> {
        const res = await restGet<ArtistDTO[]>(`${BASE}/get-all-artists-from-ids?artistIds=${command.artistIds.join(',')}`);
        return res.map(a => new ArtistData(a.id, a.name));
    }

    async getRandomArtworkId(command: GetRandomArtworkIdCommand): Promise<number> {
        return restGet<number>(`${BASE}/get-random-artwork-id?excludeIds=${command.excludeIds.join(',')}`);
    }
}
