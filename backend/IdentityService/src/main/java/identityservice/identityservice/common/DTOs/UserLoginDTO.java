package identityservice.identityservice.common.DTOs;

import lombok.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
public class UserLoginDTO {
    @Email(message = "Field must be email!")
    @NotNull(message = "Email must not be null!")
    private String email;
    @NotNull(message = "Password must not be null!")
    @NotEmpty(message = "Password must not be empty!")
    private String password;
}