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

export class GrpcImageClient implements IImageClient {
    getAllArtworks(): Promise<ArtworkData[]> { throw new Error('gRPC not yet implemented'); }
    getArtworksFromIds(_: GetArtworksFromIdsCommand): Promise<ArtworkData[]> { throw new Error('gRPC not yet implemented'); }
    getArtworksFromGenre(_: GetArtworksFromGenreCommand): Promise<IdentityArtworkData[]> { throw new Error('gRPC not yet implemented'); }
    getArtworksFromArtist(_: GetArtworksFromArtistCommand): Promise<IdentityArtworkData[]> { throw new Error('gRPC not yet implemented'); }
    getAllGenres(): Promise<GenreData[]> { throw new Error('gRPC not yet implemented'); }
    getAllArtists(): Promise<ArtistData[]> { throw new Error('gRPC not yet implemented'); }
    getAllGenresFromIds(_: GetAllGenresFromIdsCommand): Promise<GenreData[]> { throw new Error('gRPC not yet implemented'); }
    getAllArtistsFromIds(_: GetAllArtistsFromIdsCommand): Promise<ArtistData[]> { throw new Error('gRPC not yet implemented'); }
    getRandomArtworkId(_: GetRandomArtworkIdCommand): Promise<number> { throw new Error('gRPC not yet implemented'); }
}
