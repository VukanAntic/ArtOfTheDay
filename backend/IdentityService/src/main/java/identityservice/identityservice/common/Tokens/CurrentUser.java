package identityservice.identityservice.common.Tokens;

import identityservice.identityservice.infra.entities.User;
import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CurrentUser {
    private String username;

    public CurrentUser(User user) {
        username = user.getUsername();
    }
}
