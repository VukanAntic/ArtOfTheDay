package identityservice.identityservice.api.rest;

import identityservice.identityservice.common.DTOs.UserChangePasswordDTO;
import identityservice.identityservice.common.Tokens.CurrentUser;
import identityservice.identityservice.common.services.UserService;
import identityservice.identityservice.infra.entities.User;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/change-password")
    public String changePassword(@AuthenticationPrincipal CurrentUser user) {
        System.out.println(user.getUsername());
        return user.toString();
    }
}
