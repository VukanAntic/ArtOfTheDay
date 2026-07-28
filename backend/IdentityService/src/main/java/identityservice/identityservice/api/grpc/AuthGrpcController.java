package identityservice.identityservice.api.grpc;

import identityservice.identityservice.common.DTOs.AuthenticationDTO;
import identityservice.identityservice.common.DTOs.RefreshTokenDTO;
import identityservice.identityservice.common.DTOs.UserLoginDTO;
import identityservice.identityservice.common.DTOs.UserRegisterDTO;
import identityservice.identityservice.common.services.IdentityService;
import identityservice.identityservice.grpc.auth.AuthGrpcServiceGrpc;
import identityservice.identityservice.grpc.auth.AuthPayload;
import identityservice.identityservice.grpc.auth.LoginRequest;
import identityservice.identityservice.grpc.auth.RefreshRequest;
import identityservice.identityservice.grpc.auth.RegisterRequest;
import identityservice.identityservice.infra.spring.JwtUtilComponent;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import lombok.AllArgsConstructor;
import org.springframework.grpc.server.service.GrpcService;

import java.util.TimeZone;

@GrpcService
@AllArgsConstructor
public class AuthGrpcController extends AuthGrpcServiceGrpc.AuthGrpcServiceImplBase {

    private final IdentityService identityService;
    private final JwtUtilComponent jwtUtilComponent;

    @Override
    public void login(LoginRequest request, StreamObserver<AuthPayload> obs) {
        var result = identityService.loginUser(new UserLoginDTO(request.getUsername(), request.getPassword()));
        if (result.isEmpty()) {
            obs.onError(Status.UNAUTHENTICATED.withDescription("Incorrect credentials!").asRuntimeException());
            return;
        }
        obs.onNext(toPayload(result.get()));
        obs.onCompleted();
    }

    @Override
    public void refresh(RefreshRequest request, StreamObserver<AuthPayload> obs) {
        var result = identityService.refreshTokens(new RefreshTokenDTO(request.getRefreshToken(), null));
        if (result.isEmpty()) {
            obs.onError(Status.UNAUTHENTICATED.withDescription("Incorrect credentials!").asRuntimeException());
            return;
        }
        obs.onNext(toPayload(result.get()));
        obs.onCompleted();
    }

    @Override
    public void register(RegisterRequest request, StreamObserver<AuthPayload> obs) {
        var user = identityService.registerUser(
                new UserRegisterDTO(request.getUsername(), request.getEmail(), request.getPassword(),
                        request.getConfirmPassword(), request.getFirstName(), request.getLastName()),
                TimeZone.getDefault().getID());
        if (user.isEmpty()) {
            obs.onError(Status.INVALID_ARGUMENT.withDescription("Something is incorrect").asRuntimeException());
            return;
        }
        var tokens = jwtUtilComponent.generateNewTokens(user.get().getUsername());
        if (tokens.isEmpty()) {
            obs.onError(Status.INTERNAL.withDescription("Could not generate tokens").asRuntimeException());
            return;
        }
        obs.onNext(toPayload(tokens.get()));
        obs.onCompleted();
    }

    private AuthPayload toPayload(AuthenticationDTO dto) {
        return AuthPayload.newBuilder()
                .setAccessToken(dto.getAccessToken() == null ? "" : dto.getAccessToken())
                .setRefreshToken(dto.getRefreshToken() == null ? "" : dto.getRefreshToken())
                .build();
    }
}
