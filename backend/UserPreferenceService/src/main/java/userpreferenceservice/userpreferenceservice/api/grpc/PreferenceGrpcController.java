package userpreferenceservice.userpreferenceservice.api.grpc;

import common.common.authentication.AuthenticatedUser;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import lombok.AllArgsConstructor;
import org.springframework.grpc.server.service.GrpcService;
import userpreferenceservice.userpreferenceservice.common.model.AddToDBStatus;
import userpreferenceservice.userpreferenceservice.common.service.UserPreferenceService;
import userpreferenceservice.userpreferenceservice.grpc.*;

@GrpcService
@AllArgsConstructor
public class PreferenceGrpcController extends PreferenceGrpcServiceGrpc.PreferenceGrpcServiceImplBase {

    private final UserPreferenceService userPreferenceService;

    @Override
    public void getPreferences(Empty request, StreamObserver<Preferences> obs) {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            unauth(obs);
            return;
        }
        var opt = userPreferenceService.getUserPreferences(username);
        if (opt.isEmpty()) {
            obs.onError(Status.NOT_FOUND.withDescription("Preferences not found").asRuntimeException());
            return;
        }
        var p = opt.get();
        obs.onNext(Preferences.newBuilder()
                .setUsername(p.getUsername() == null ? "" : p.getUsername())
                .addAllLikedArtworkIds(p.getLikedArtworkIds())
                .addAllLikedGenreIds(p.getLikedGenreIds())
                .addAllDislikedArtworksIds(p.getDislikedArtworksIds())
                .addAllLikedArtistIds(p.getLikedArtistIds())
                .build());
        obs.onCompleted();
    }

    @Override
    public void addLikedArtwork(ArtworkIdRequest request, StreamObserver<BoolResponse> obs) {
        var u = AuthenticatedUser.getUsername();
        if (u == null) { unauth(obs); return; }
        bool(userPreferenceService.addLikedArtworks(u, request.getArtworkId()), obs);
    }

    @Override
    public void removeLikedArtwork(ArtworkIdRequest request, StreamObserver<BoolResponse> obs) {
        var u = AuthenticatedUser.getUsername();
        if (u == null) { unauth(obs); return; }
        bool(userPreferenceService.removeLikedArtworks(u, request.getArtworkId()), obs);
    }

    @Override
    public void addLikedGenre(GenreIdRequest request, StreamObserver<BoolResponse> obs) {
        var u = AuthenticatedUser.getUsername();
        if (u == null) { unauth(obs); return; }
        bool(userPreferenceService.addLikedGenre(u, request.getGenreId()), obs);
    }

    @Override
    public void removeLikedGenre(GenreIdRequest request, StreamObserver<BoolResponse> obs) {
        var u = AuthenticatedUser.getUsername();
        if (u == null) { unauth(obs); return; }
        bool(userPreferenceService.removeLikedGenre(u, request.getGenreId()), obs);
    }

    @Override
    public void addLikedArtist(ArtistIdRequest request, StreamObserver<BoolResponse> obs) {
        var u = AuthenticatedUser.getUsername();
        if (u == null) { unauth(obs); return; }
        bool(userPreferenceService.addLikedArtist(u, request.getArtistId()), obs);
    }

    @Override
    public void removeLikedArtist(ArtistIdRequest request, StreamObserver<BoolResponse> obs) {
        var u = AuthenticatedUser.getUsername();
        if (u == null) { unauth(obs); return; }
        bool(userPreferenceService.removeLikedArtist(u, request.getArtistId()), obs);
    }

    @Override
    public void addDislikedArtwork(DislikedArtworkIdRequest request, StreamObserver<BoolResponse> obs) {
        var u = AuthenticatedUser.getUsername();
        if (u == null) { unauth(obs); return; }
        bool(userPreferenceService.addDislikedArtwork(u, request.getArtworkId()), obs);
    }

    @Override
    public void removeDislikedArtwork(DislikedArtworkIdRequest request, StreamObserver<BoolResponse> obs) {
        var u = AuthenticatedUser.getUsername();
        if (u == null) { unauth(obs); return; }
        bool(userPreferenceService.removeDislikedArtwork(u, request.getArtworkId()), obs);
    }

    private void bool(AddToDBStatus status, StreamObserver<BoolResponse> obs) {
        obs.onNext(BoolResponse.newBuilder().setSuccess(status == AddToDBStatus.SUCCESS).build());
        obs.onCompleted();
    }

    private void unauth(StreamObserver<?> obs) {
        obs.onError(Status.UNAUTHENTICATED.withDescription("No authenticated user").asRuntimeException());
    }
}
