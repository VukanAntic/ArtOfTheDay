package identityservice.identityservice.api.graphql;

import identityservice.identityservice.common.DTOs.AuthenticationDTO;
import identityservice.identityservice.common.DTOs.RefreshTokenDTO;
import identityservice.identityservice.common.DTOs.UserLoginDTO;
import identityservice.identityservice.common.DTOs.UserRegisterDTO;
import identityservice.identityservice.common.services.IdentityService;
import identityservice.identityservice.infra.spring.JwtUtilComponent;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import java.util.TimeZone;

@Controller
@AllArgsConstructor
public class AuthGraphqlController {

    private final IdentityService identityService;
    private final JwtUtilComponent jwtUtilComponent;

    @MutationMapping
    public AuthenticationDTO login(@Argument String username, @Argument String password) {
        return identityService.loginUser(new UserLoginDTO(username, password))
                .orElseThrow(() -> new IllegalArgumentException("Incorrect credentials!"));
    }

    @MutationMapping
    public AuthenticationDTO refresh(@Argument String refreshToken) {
        return identityService.refreshTokens(new RefreshTokenDTO(refreshToken, null))
                .orElseThrow(() -> new IllegalArgumentException("Incorrect credentials!"));
    }

    @MutationMapping
    public AuthenticationDTO register(@Argument String username,
                                      @Argument String email,
                                      @Argument String password,
                                      @Argument String confirmPassword,
                                      @Argument String firstName,
                                      @Argument String lastName) {
        var user = identityService.registerUser(
                new UserRegisterDTO(username, email, password, confirmPassword, firstName, lastName),
                TimeZone.getDefault().getID());
        if (user.isEmpty()) {
            throw new IllegalArgumentException("Something is incorrect");
        }
        return jwtUtilComponent.generateNewTokens(user.get().getUsername())
                .orElseThrow(() -> new IllegalStateException("Could not generate tokens"));
    }
}
