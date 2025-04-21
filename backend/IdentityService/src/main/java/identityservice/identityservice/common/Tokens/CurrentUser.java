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
    private String email;
    private String firstName;
    private String lastName;

    public CurrentUser(User user) {
        username = user.getUsername();
        email = user.getEmail();
        firstName = user.getFirstName();
        lastName = user.getLastName();
    }
}
