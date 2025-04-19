package identityservice.identityservice.common.DTOs;

import lombok.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
public class UserLoginDTO {
    @NotEmpty(message = "Password must not be empty!")
    @NotNull(message = "Email must not be null!")
    private String username;
    @NotNull(message = "Password must not be null!")
    @NotEmpty(message = "Password must not be empty!")
    private String password;
}