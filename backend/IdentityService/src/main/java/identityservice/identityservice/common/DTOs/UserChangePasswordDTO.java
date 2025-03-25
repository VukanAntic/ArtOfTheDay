package identityservice.identityservice.common.DTOs;

import lombok.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
public class UserChangePasswordDTO {
    @NotNull(message = "NewPassword must not be null!")
    @NotEmpty(message = "NewPassword must not be empty!")
    private String newPassword;
    @NotNull(message = "OldPassword must not be null!")
    @NotEmpty(message = "OldPassword must not be empty!")
    private String oldPassword;
}
