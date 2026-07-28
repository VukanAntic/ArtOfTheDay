import {createClient} from '@connectrpc/connect';
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
import {Artwork, IdentityArtwork, ImageGrpcService} from '@/src/services/grpc/gen/image_pb';
import {grpcTransport} from '@/src/services/grpc/grpcTransport';

function toArtwork(a: Artwork): ArtworkData {
    return new ArtworkData(
        Number(a.id),
        a.title,
        a.description,
        a.imageUrl,
        new ArtistData(Number(a.artist?.id ?? 0), a.artist?.name ?? ''),
        a.genres.map(g => new GenreData(g.id, g.name)),
    );
}

function toIdentityArtwork(a: IdentityArtwork): IdentityArtworkData {
    return new IdentityArtworkData(Number(a.id), a.title, a.description, a.imageUrl);
}

export class GrpcImageClient implements IImageClient {
    private readonly client = createClient(ImageGrpcService, grpcTransport);

    async getAllArtworks(): Promise<ArtworkData[]> {
        const res = await this.client.getAllArtworks({});
        return res.artworks.map(toArtwork);
    }

    async getArtworksFromIds(command: GetArtworksFromIdsCommand): Promise<ArtworkData[]> {
        const res = await this.client.getArtworksFromIds({ids: command.artworkIds.map(BigInt)});
        return res.artworks.map(toArtwork);
    }

    async getArtworksFromGenre(command: GetArtworksFromGenreCommand): Promise<IdentityArtworkData[]> {
        const res = await this.client.getArtworksFromGenre({genreId: command.genreId});
        return res.artworks.map(toIdentityArtwork);
    }

    async getArtworksFromArtist(command: GetArtworksFromArtistCommand): Promise<IdentityArtworkData[]> {
        const res = await this.client.getArtworksFromArtist({artistId: BigInt(command.artistId)});
        return res.artworks.map(toIdentityArtwork);
    }

    async getAllGenres(): Promise<GenreData[]> {
        const res = await this.client.getAllGenres({});
        return res.genres.map(g => new GenreData(g.id, g.name));
    }

    async getAllArtists(): Promise<ArtistData[]> {
        const res = await this.client.getAllArtists({});
        return res.artists.map(a => new ArtistData(Number(a.id), a.name));
    }

    async getAllGenresFromIds(command: GetAllGenresFromIdsCommand): Promise<GenreData[]> {
        const res = await this.client.getGenresFromIds({ids: command.genreIds});
        return res.genres.map(g => new GenreData(g.id, g.name));
    }

    async getAllArtistsFromIds(command: GetAllArtistsFromIdsCommand): Promise<ArtistData[]> {
        const res = await this.client.getArtistsFromIds({ids: command.artistIds.map(BigInt)});
        return res.artists.map(a => new ArtistData(Number(a.id), a.name));
    }

    async getRandomArtworkId(command: GetRandomArtworkIdCommand): Promise<number> {
        const res = await this.client.getRandomArtworkId({excludeIds: command.excludeIds.map(BigInt)});
        if (!res.found) {
            throw new Error('No artwork found');
        }
        return Number(res.artworkId);
    }

    async getRandomArtworks(command: GetRandomArtworksCommand): Promise<ArtworkData[]> {
        const res = await this.client.getRandomArtworks({count: command.count});
        return res.artworks.map(toArtwork);
    }
}
