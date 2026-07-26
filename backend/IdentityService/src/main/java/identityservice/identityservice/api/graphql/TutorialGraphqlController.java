package identityservice.identityservice.api.graphql;

import identityservice.identityservice.common.DTOs.FtueCompleteDTO;
import identityservice.identityservice.common.Tokens.CurrentUser;
import identityservice.identityservice.common.services.TutorialService;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@AllArgsConstructor
public class TutorialGraphqlController {

    private final TutorialService tutorialService;

    @MutationMapping
    public boolean ftueComplete(@Argument List<Long> artworkIds,
                                @Argument List<String> genreIds,
                                @Argument List<Long> artistIds) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof CurrentUser currentUser)) {
            throw new IllegalStateException("No authenticated user");
        }
        return tutorialService.completeFtue(
                currentUser.getUsername(),
                new FtueCompleteDTO(artworkIds, genreIds, artistIds));
    }
}
