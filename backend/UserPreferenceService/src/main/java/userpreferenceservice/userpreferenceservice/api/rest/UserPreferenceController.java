package userpreferenceservice.userpreferenceservice.api.rest;

import common.common.authentication.AuthenticatedUser;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import userpreferenceservice.userpreferenceservice.common.model.UserPreferences;
import userpreferenceservice.userpreferenceservice.common.service.UserPreferenceService;

import java.util.Optional;

@RestController
@RequestMapping(value = "/api/preference", produces = {
        "application/json",
        "application/x-protobuf"
})
@AllArgsConstructor
public class UserPreferenceController {

    private final UserPreferenceService userPreferenceService;

    @GetMapping("/get")
    public Optional<UserPreferences> get() {
        var username = AuthenticatedUser.getUsername();
        return userPreferenceService.getUserPreferences(username);
    }

}
