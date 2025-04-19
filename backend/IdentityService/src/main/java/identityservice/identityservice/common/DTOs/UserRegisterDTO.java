package identityservice.identityservice.common.DTOs;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class UserRegisterDTO {
    @NotEmpty(message = "Password must not be empty!")
    @NotNull(message = "Email must not be null!")
    @Size(min = 6, max = 20)
    private String username;
    @Email(message = "Field must be email!")
    @NotNull(message = "Email must not be null!")
    private String email;
    @NotNull(message = "Password must not be null!")
    @NotEmpty(message = "Password must not be empty!")
    @Size(min = 6, max = 20)
    @Pattern(regexp = "(?=.*[A-Z])(?=.*\\d)[A-Z\\d]{6,20}",
            message = "Password must be between 6 and 20 characters, and contain at least one uppercase letter and one digit!")
    private String password;
    private String confirmPassword;
    @NotNull(message = "FirstName must not be null!")
    @NotEmpty(message = "FirstName must not be empty!")
    private String firstName;
    @NotNull(message = "LastName must not be null!")
    @NotEmpty(message = "LastName must not be empty!")
    private String lastName;
}
