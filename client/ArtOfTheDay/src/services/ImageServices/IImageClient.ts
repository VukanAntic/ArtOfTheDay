import {ArtworkData} from '@/src/domain/ArtworkData';
import {ArtistData} from '@/src/domain/ArtistData';
import {GenreData} from '@/src/domain/GenreData';
import {IdentityArtworkData} from '@/src/domain/IdentityArtworkData';
import {
    GetAllArtistsFromIdsCommand,
    GetAllGenresFromIdsCommand,
    GetArtworksFromArtistCommand,
    GetArtworksFromGenreCommand,
    GetArtworksFromIdsCommand,
    GetRandomArtworkIdCommand,
} from './ImageCommands';

export interface IImageClient {
    getAllArtworks(): Promise<ArtworkData[]>;
    getArtworksFromIds(command: GetArtworksFromIdsCommand): Promise<ArtworkData[]>;
    getArtworksFromGenre(command: GetArtworksFromGenreCommand): Promise<IdentityArtworkData[]>;
    getArtworksFromArtist(command: GetArtworksFromArtistCommand): Promise<IdentityArtworkData[]>;
    getAllGenres(): Promise<GenreData[]>;
    getAllArtists(): Promise<ArtistData[]>;
    getAllGenresFromIds(command: GetAllGenresFromIdsCommand): Promise<GenreData[]>;
    getAllArtistsFromIds(command: GetAllArtistsFromIdsCommand): Promise<ArtistData[]>;
    getRandomArtworkId(command: GetRandomArtworkIdCommand): Promise<number>;
}
