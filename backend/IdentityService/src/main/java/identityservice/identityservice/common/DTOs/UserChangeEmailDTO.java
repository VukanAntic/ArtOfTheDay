package identityservice.identityservice.common.DTOs;

import lombok.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
public class UserChangeEmailDTO {
    @NotNull(message = "New email cannot be null!")
    @Email(message = "Field must be an email!")
    private String newEmail;
}
