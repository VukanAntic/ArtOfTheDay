package identityservice.identityservice.api.rest;

import identityservice.identityservice.common.DTOs.DeleteUserDTO;
import identityservice.identityservice.common.DTOs.UserChangeEmailDTO;
import identityservice.identityservice.common.DTOs.UserChangeFirstAndLastNameDTO;
import identityservice.identityservice.common.DTOs.UserChangePasswordDTO;
import identityservice.identityservice.common.Tokens.CurrentUser;
import identityservice.identityservice.common.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping(value = "/api/authentication", produces = {
        "application/json",
        "application/x-protobuf"
})
@AllArgsConstructor
public class UserController {
    // TODO [vukana] : If i dont store the refresh tokens, can i even implement the logout?

    private final UserService userService;

    @GetMapping("/get-current-user")
    public ResponseEntity<?> GetCurrentUser(@AuthenticationPrincipal CurrentUser principalUser) {
        return ResponseEntity.ok(userService.getCurrentUser(principalUser));
    }

    @PostMapping("/change-email")
    public ResponseEntity<?> changeEmail(@AuthenticationPrincipal CurrentUser principalUser, @RequestBody UserChangeEmailDTO userChangeEmailDTO) {
        // need to update the securityContext
        var updatedUser = userService.changeEmail(principalUser, userChangeEmailDTO.getNewEmail());
        if (updatedUser.isEmpty()) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to change email!");
        }
        return ResponseEntity.ok(updatedUser.get());
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@AuthenticationPrincipal CurrentUser principalUser,
                                            @RequestBody UserChangePasswordDTO userChangePasswordDTO)
    {
        var updatedUser = userService.changePassword(principalUser,
                userChangePasswordDTO.getOldPassword(),
                userChangePasswordDTO.getNewPassword()
        );
        if (updatedUser.isEmpty()) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to change password!");
        }
        return ResponseEntity.ok(updatedUser.get());
    }

    @PostMapping("/change-first-and-last-name")
    public ResponseEntity<?> changeFirstAndLastName(@AuthenticationPrincipal CurrentUser principalUser,
                                            @RequestBody UserChangeFirstAndLastNameDTO changeFirstAndLastNameDTO)
    {
        var updatedUser = userService.changeFirstAndLastName(principalUser,
                changeFirstAndLastNameDTO.getNewFirstName(),
                changeFirstAndLastNameDTO.getNewLastName()
        );
        if (updatedUser.isEmpty()) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to change first and last name!");
        }
        return ResponseEntity.ok(updatedUser.get());
    }

    // missing delete, change first/last name
    @DeleteMapping("/delete-user")
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal CurrentUser principalUser,
                                        @RequestBody DeleteUserDTO deleteUserDTO)
    {
        var user = userService.deleteUser(principalUser, deleteUserDTO.getUsername());
        if (user.isEmpty()) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to delete user!");
        }
        return ResponseEntity.ok(user);
    }

}
