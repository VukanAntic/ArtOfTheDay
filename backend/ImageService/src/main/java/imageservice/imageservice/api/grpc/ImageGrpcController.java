package imageservice.imageservice.api.grpc;

import imageservice.imageservice.common.DTOs.Artist.IdentityArtistDTO;
import imageservice.imageservice.common.DTOs.Artwork.ArtworkDTO;
import imageservice.imageservice.common.DTOs.Artwork.IdentityArtworkDTO;
import imageservice.imageservice.common.DTOs.Genre.IdentityGenreDTO;
import imageservice.imageservice.common.services.ArtistService;
import imageservice.imageservice.common.services.ArtworkService;
import imageservice.imageservice.common.services.GenreService;
import imageservice.imageservice.grpc.*;
import io.grpc.stub.StreamObserver;
import lombok.AllArgsConstructor;
import org.springframework.grpc.server.service.GrpcService;

import java.util.HashSet;
import java.util.List;

@GrpcService
@AllArgsConstructor
public class ImageGrpcController extends ImageGrpcServiceGrpc.ImageGrpcServiceImplBase {

    private final ArtworkService artworkService;
    private final ArtistService artistService;
    private final GenreService genreService;

    @Override
    public void getAllArtworks(Empty request, StreamObserver<ArtworkList> obs) {
        respondArtworks(artworkService.getAllArtworks(), obs);
    }

    @Override
    public void getArtworksFromIds(IdsInt64 request, StreamObserver<ArtworkList> obs) {
        respondArtworks(artworkService.getAllArtworksFromIds(request.getIdsList()), obs);
    }

    @Override
    public void getArtworksFromGenre(GenreIdRequest request, StreamObserver<IdentityArtworkList> obs) {
        respondIdentityArtworks(artworkService.getAllArtworks(request.getGenreId()), obs);
    }

    @Override
    public void getArtworksFromArtist(ArtistIdRequest request, StreamObserver<IdentityArtworkList> obs) {
        respondIdentityArtworks(artistService.getAllArtworksFromArtist(request.getArtistId()), obs);
    }

    @Override
    public void getAllGenres(Empty request, StreamObserver<GenreList> obs) {
        respondGenres(genreService.getAllGenres(), obs);
    }

    @Override
    public void getAllArtists(Empty request, StreamObserver<ArtistList> obs) {
        respondArtists(artistService.getAllArtists(), obs);
    }

    @Override
    public void getGenresFromIds(IdsString request, StreamObserver<GenreList> obs) {
        respondGenres(genreService.getAllGenresFromIds(request.getIdsList()), obs);
    }

    @Override
    public void getArtistsFromIds(IdsInt64 request, StreamObserver<ArtistList> obs) {
        respondArtists(artistService.getAllArtistsByIds(request.getIdsList()), obs);
    }

    @Override
    public void getRandomArtworks(CountRequest request, StreamObserver<ArtworkList> obs) {
        respondArtworks(artworkService.getRandomArtworks(request.getCount()), obs);
    }

    @Override
    public void getRandomArtworkId(ExcludeIdsRequest request, StreamObserver<ArtworkIdResponse> obs) {
        var excludeIds = request.getExcludeIdsList().isEmpty() ? null : new HashSet<>(request.getExcludeIdsList());
        var id = artworkService.getRandomArtworkIdExcluding(excludeIds);
        obs.onNext(ArtworkIdResponse.newBuilder()
                .setFound(id.isPresent())
                .setArtworkId(id.orElse(0L))
                .build());
        obs.onCompleted();
    }

    private void respondArtworks(List<ArtworkDTO> dtos, StreamObserver<ArtworkList> obs) {
        var b = ArtworkList.newBuilder();
        for (var d : dtos) {
            b.addArtworks(toArtwork(d));
        }
        obs.onNext(b.build());
        obs.onCompleted();
    }

    private void respondIdentityArtworks(List<IdentityArtworkDTO> dtos, StreamObserver<IdentityArtworkList> obs) {
        var b = IdentityArtworkList.newBuilder();
        for (var d : dtos) {
            b.addArtworks(IdentityArtwork.newBuilder()
                    .setId(d.getId())
                    .setTitle(s(d.getTitle()))
                    .setDescription(s(d.getDescription()))
                    .setImageUrl(s(d.getImageUrl()))
                    .build());
        }
        obs.onNext(b.build());
        obs.onCompleted();
    }

    private void respondGenres(List<IdentityGenreDTO> dtos, StreamObserver<GenreList> obs) {
        var b = GenreList.newBuilder();
        for (var d : dtos) {
            b.addGenres(Genre.newBuilder().setId(s(d.getId())).setName(s(d.getName())).build());
        }
        obs.onNext(b.build());
        obs.onCompleted();
    }

    private void respondArtists(List<IdentityArtistDTO> dtos, StreamObserver<ArtistList> obs) {
        var b = ArtistList.newBuilder();
        for (var d : dtos) {
            b.addArtists(Artist.newBuilder().setId(d.getId()).setName(s(d.getName())).build());
        }
        obs.onNext(b.build());
        obs.onCompleted();
    }

    private Artwork toArtwork(ArtworkDTO d) {
        var b = Artwork.newBuilder()
                .setId(d.getId())
                .setTitle(s(d.getTitle()))
                .setDescription(s(d.getDescription()))
                .setImageUrl(s(d.getImageUrl()))
                .setArtist(Artist.newBuilder()
                        .setId(d.getArtist().getId())
                        .setName(s(d.getArtist().getName()))
                        .build());
        for (var g : d.getGenres()) {
            b.addGenres(Genre.newBuilder().setId(s(g.getId())).setName(s(g.getName())).build());
        }
        return b.build();
    }

    private static String s(String v) {
        return v == null ? "" : v;
    }
}
