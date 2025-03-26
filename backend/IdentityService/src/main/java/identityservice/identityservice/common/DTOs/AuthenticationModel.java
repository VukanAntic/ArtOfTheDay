package identityservice.identityservice.common.DTOs;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class AuthenticationModel {
    public String accessToken;
    public String refreshToken;
}
