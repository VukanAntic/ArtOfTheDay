package identityservice.identityservice.api.rest;

import identityservice.identityservice.common.DTOs.UserRegisterDTO;
import identityservice.identityservice.common.services.UserService;
import identityservice.identityservice.infra.entities.UserEntity;
import lombok.AllArgsConstructor;
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
public class RegistrationController {

    private final UserService userService;


    @PostMapping("/register")
    public UserEntity register(@RequestBody UserRegisterDTO userRegisterDTO) {
        return userService.registerUser(userRegisterDTO);
    }
}
