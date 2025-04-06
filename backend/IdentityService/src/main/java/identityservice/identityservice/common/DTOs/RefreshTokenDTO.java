package identityservice.identityservice.common.DTOs;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class RefreshTokenDTO {
    public String refreshToken;
    public String email;
}
