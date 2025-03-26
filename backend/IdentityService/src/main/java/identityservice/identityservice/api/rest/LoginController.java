package identityservice.identityservice.api.rest;

import identityservice.identityservice.common.DTOs.RefreshModelToken;
import identityservice.identityservice.common.DTOs.UserLoginDTO;
import identityservice.identityservice.common.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping(value = "/api/authentication", produces = {
        "application/json",
        "application/x-protobuf"
})
@AllArgsConstructor
public class LoginController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDTO userLoginDTO) {
        var loginResult = userService.loginUser(userLoginDTO);
        if (loginResult.isEmpty()) {
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect credentials!");
        }

        return ResponseEntity.ok(loginResult.get());
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshModelToken refreshModelToken) {
        var loginResult = userService.refreshTokens(refreshModelToken);
        if (loginResult.isEmpty()) {
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect credentials!");
        }

        return ResponseEntity.ok(loginResult.get());
    }

    // TODO [vukana] : If i dont store the refresh tokens, can i even implement the logout?

}
