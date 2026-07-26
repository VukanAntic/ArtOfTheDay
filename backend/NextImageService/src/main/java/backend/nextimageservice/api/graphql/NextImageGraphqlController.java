package backend.nextimageservice.api.graphql;

import backend.nextimageservice.common.DTO.SeenImageDTO;
import backend.nextimageservice.common.service.NextImageService;
import common.common.authentication.AuthenticatedUser;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.TimeZone;

@Controller
@AllArgsConstructor
public class NextImageGraphqlController {

    private final NextImageService nextImageService;

    @QueryMapping
    public List<SeenImageDTO> history() {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            throw new IllegalStateException("No authenticated user");
        }
        return nextImageService.getUserHistory(username);
    }

    @MutationMapping
    public boolean setPreferredTime(@Argument int preferredTimeInHours,
                                    @Argument int preferredTimeInMinutes,
                                    @Argument String timeZoneId) {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            throw new IllegalStateException("No authenticated user");
        }
        String resolvedTimeZoneId = (timeZoneId != null && !timeZoneId.isBlank())
                ? timeZoneId
                : TimeZone.getDefault().getID();
        nextImageService.SetPreferredTimeForUser(
                username, resolvedTimeZoneId, preferredTimeInHours, preferredTimeInMinutes);
        return true;
    }
}
