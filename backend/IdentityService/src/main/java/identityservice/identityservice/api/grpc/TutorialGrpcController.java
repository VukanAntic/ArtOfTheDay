package identityservice.identityservice.api.grpc;

import identityservice.identityservice.common.DTOs.FtueCompleteDTO;
import identityservice.identityservice.common.Tokens.CurrentUser;
import identityservice.identityservice.common.services.TutorialService;
import identityservice.identityservice.grpc.tutorial.BoolResponse;
import identityservice.identityservice.grpc.tutorial.FtueCompleteRequest;
import identityservice.identityservice.grpc.tutorial.TutorialGrpcServiceGrpc;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import lombok.AllArgsConstructor;
import org.springframework.grpc.server.service.GrpcService;
import org.springframework.security.core.context.SecurityContextHolder;

@GrpcService
@AllArgsConstructor
public class TutorialGrpcController extends TutorialGrpcServiceGrpc.TutorialGrpcServiceImplBase {

    private final TutorialService tutorialService;

    @Override
    public void ftueComplete(FtueCompleteRequest request, StreamObserver<BoolResponse> obs) {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof CurrentUser currentUser)) {
            obs.onError(Status.UNAUTHENTICATED.withDescription("No authenticated user").asRuntimeException());
            return;
        }
        boolean ok = tutorialService.completeFtue(
                currentUser.getUsername(),
                new FtueCompleteDTO(request.getArtworkIdsList(), request.getGenreIdsList(), request.getArtistIdsList()));
        obs.onNext(BoolResponse.newBuilder().setSuccess(ok).build());
        obs.onCompleted();
    }
}
