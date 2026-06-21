package identityservice.identityservice.api.rest;

import common.common.authentication.AuthenticatedUser;
import identityservice.identityservice.common.services.TutorialService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tutorial")
@AllArgsConstructor
public class TutorialController {

    private final TutorialService tutorialService;

    @PostMapping("/ftue-complete")
    public ResponseEntity<Void> ftueComplete() {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            return ResponseEntity.notFound().build();
        }
        tutorialService.completeFtue(username);
        return ResponseEntity.ok().build();
    }
}
