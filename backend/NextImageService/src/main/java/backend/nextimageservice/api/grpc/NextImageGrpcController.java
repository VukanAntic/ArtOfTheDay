package backend.nextimageservice.api.grpc;

import backend.nextimageservice.common.service.NextImageService;
import backend.nextimageservice.grpc.GetHistoryRequest;
import backend.nextimageservice.grpc.GetHistoryResponse;
import backend.nextimageservice.grpc.NextImageGrpcServiceGrpc;
import backend.nextimageservice.grpc.SeenImage;
import backend.nextimageservice.grpc.SetPreferredTimeRequest;
import backend.nextimageservice.grpc.SetPreferredTimeResponse;
import common.common.authentication.AuthenticatedUser;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import lombok.AllArgsConstructor;
import org.springframework.grpc.server.service.GrpcService;

import java.util.TimeZone;

@GrpcService
@AllArgsConstructor
public class NextImageGrpcController extends NextImageGrpcServiceGrpc.NextImageGrpcServiceImplBase {

    private final NextImageService nextImageService;

    @Override
    public void getHistory(GetHistoryRequest request, StreamObserver<GetHistoryResponse> responseObserver) {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            responseObserver.onError(Status.UNAUTHENTICATED
                    .withDescription("No authenticated user").asRuntimeException());
            return;
        }
        var builder = GetHistoryResponse.newBuilder();
        for (var dto : nextImageService.getUserHistory(username)) {
            builder.addSeenImages(SeenImage.newBuilder()
                    .setArtworkId(dto.getArtworkId())
                    .setSeenAt(dto.getSeenAt())
                    .build());
        }
        responseObserver.onNext(builder.build());
        responseObserver.onCompleted();
    }

    @Override
    public void setPreferredTime(SetPreferredTimeRequest request, StreamObserver<SetPreferredTimeResponse> responseObserver) {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            responseObserver.onError(Status.UNAUTHENTICATED
                    .withDescription("No authenticated user").asRuntimeException());
            return;
        }
        String timeZoneId = (request.getTimeZoneId() != null && !request.getTimeZoneId().isBlank())
                ? request.getTimeZoneId()
                : TimeZone.getDefault().getID();
        nextImageService.SetPreferredTimeForUser(
                username, timeZoneId, request.getPreferredTimeInHours(), request.getPreferredTimeInMinutes());
        responseObserver.onNext(SetPreferredTimeResponse.newBuilder().setSuccess(true).build());
        responseObserver.onCompleted();
    }
}
