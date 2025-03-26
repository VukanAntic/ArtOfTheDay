package identityservice.identityservice.common.DTOs;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class AuthenticationDTO {
    public String accessToken;
    public String refreshToken;
}
