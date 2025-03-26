package identityservice.identityservice.common.DTOs;

import lombok.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
public class UserChangeFirstAndLastNameDTO {
    @NotNull(message = "newFirstName must not be null!")
    @NotEmpty(message = "newFirstName must not be empty!")
    private String newFirstName;
    @NotNull(message = "newLastName must not be null!")
    @NotEmpty(message = "newLastName must not be empty!")
    private String newLastName;
}
