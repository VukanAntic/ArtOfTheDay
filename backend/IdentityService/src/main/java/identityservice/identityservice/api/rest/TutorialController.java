package identityservice.identityservice.api.rest;

import identityservice.identityservice.common.Tokens.CurrentUser;
import identityservice.identityservice.common.services.TutorialService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tutorial")
@AllArgsConstructor
public class TutorialController {

    private final TutorialService tutorialService;

    @PostMapping("/ftue-complete")
    public ResponseEntity<Void> ftueComplete(@AuthenticationPrincipal CurrentUser currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(401).build();
        }
        tutorialService.completeFtue(currentUser.getUsername());
        return ResponseEntity.ok().build();
    }
}
