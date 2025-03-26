package identityservice.identityservice.common.DTOs;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class RefreshModelToken {
    public String email;
    public String refreshToken;
}
