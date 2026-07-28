package identityservice.identityservice.api.grpc;

import identityservice.identityservice.common.Tokens.CurrentUser;
import identityservice.identityservice.common.services.UserService;
import identityservice.identityservice.grpc.user.BoolResponse;
import identityservice.identityservice.grpc.user.ChangeEmailRequest;
import identityservice.identityservice.grpc.user.ChangeNameRequest;
import identityservice.identityservice.grpc.user.ChangePasswordRequest;
import identityservice.identityservice.grpc.user.DeleteUserRequest;
import identityservice.identityservice.grpc.user.Empty;
import identityservice.identityservice.grpc.user.UserGrpcServiceGrpc;
import identityservice.identityservice.grpc.user.UserProfile;
import identityservice.identityservice.infra.entities.User;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import lombok.AllArgsConstructor;
import org.springframework.grpc.server.service.GrpcService;
import org.springframework.security.core.context.SecurityContextHolder;

@GrpcService
@AllArgsConstructor
public class UserGrpcController extends UserGrpcServiceGrpc.UserGrpcServiceImplBase {

    private final UserService userService;

    @Override
    public void currentUser(Empty request, StreamObserver<UserProfile> obs) {
        var cu = currentUserOrNull();
        if (cu == null) { unauth(obs); return; }
        var u = userService.getCurrentUser(cu);
        if (u.isEmpty()) {
            obs.onError(Status.NOT_FOUND.withDescription("User not found").asRuntimeException());
            return;
        }
        obs.onNext(toProfile(u.get()));
        obs.onCompleted();
    }

    @Override
    public void changeEmail(ChangeEmailRequest request, StreamObserver<UserProfile> obs) {
        var cu = currentUserOrNull();
        if (cu == null) { unauth(obs); return; }
        var u = userService.changeEmail(cu, request.getNewEmail());
        if (u.isEmpty()) {
            obs.onError(Status.INVALID_ARGUMENT.withDescription("Unable to change email!").asRuntimeException());
            return;
        }
        obs.onNext(toProfile(u.get()));
        obs.onCompleted();
    }

    @Override
    public void changePassword(ChangePasswordRequest request, StreamObserver<UserProfile> obs) {
        var cu = currentUserOrNull();
        if (cu == null) { unauth(obs); return; }
        var u = userService.changePassword(cu, request.getOldPassword(), request.getNewPassword());
        if (u.isEmpty()) {
            obs.onError(Status.INVALID_ARGUMENT.withDescription("Unable to change password!").asRuntimeException());
            return;
        }
        obs.onNext(toProfile(u.get()));
        obs.onCompleted();
    }

    @Override
    public void changeName(ChangeNameRequest request, StreamObserver<UserProfile> obs) {
        var cu = currentUserOrNull();
        if (cu == null) { unauth(obs); return; }
        var u = userService.changeFirstAndLastName(cu, request.getNewFirstName(), request.getNewLastName());
        if (u.isEmpty()) {
            obs.onError(Status.INVALID_ARGUMENT.withDescription("Unable to change first and last name!").asRuntimeException());
            return;
        }
        obs.onNext(toProfile(u.get()));
        obs.onCompleted();
    }

    @Override
    public void deleteUser(DeleteUserRequest request, StreamObserver<BoolResponse> obs) {
        var cu = currentUserOrNull();
        if (cu == null) { unauth(obs); return; }
        boolean ok = userService.deleteUser(cu, request.getUsername()).isPresent();
        obs.onNext(BoolResponse.newBuilder().setSuccess(ok).build());
        obs.onCompleted();
    }

    private UserProfile toProfile(User e) {
        return UserProfile.newBuilder()
                .setUsername(s(e.getUsername()))
                .setEmail(s(e.getEmail()))
                .setFirstName(s(e.getFirstName()))
                .setLastName(s(e.getLastName()))
                .build();
    }

    private CurrentUser currentUserOrNull() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof CurrentUser cu) {
            return cu;
        }
        return null;
    }

    private void unauth(StreamObserver<?> obs) {
        obs.onError(Status.UNAUTHENTICATED.withDescription("No authenticated user").asRuntimeException());
    }

    private static String s(String v) {
        return v == null ? "" : v;
    }
}
