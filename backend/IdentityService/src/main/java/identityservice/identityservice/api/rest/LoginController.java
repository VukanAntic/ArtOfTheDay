package identityservice.identityservice.api.rest;

import identityservice.identityservice.common.DTOs.RefreshTokenDTO;
import identityservice.identityservice.common.DTOs.UserLoginDTO;
import identityservice.identityservice.common.services.IdentityService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/authentication", produces = {
        "application/json",
        "application/x-protobuf"
})
@AllArgsConstructor
public class LoginController {

    private final IdentityService identityService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDTO userLoginDTO) {
        var loginResult = identityService.loginUser(userLoginDTO);
        if (loginResult.isEmpty()) {
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect credentials!");
        }

        return ResponseEntity.ok(loginResult.get());
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshTokenDTO refreshTokenDTO) {
        var loginResult = identityService.refreshTokens(refreshTokenDTO);
        if (loginResult.isEmpty()) {
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect credentials!");
        }

        return ResponseEntity.ok(loginResult.get());
    }
}
