package backend.nextimageservice.common.model;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UserHistory {
    private String username;
    @Builder.Default
    private Set<Long> artworkSeenIds = new HashSet<>();
    @Builder.Default
    private int preferredTimeForUpdateInMinutes = 0;
    @Builder.Default
    private int preferredTimeForUpdateInHours = 9;
    private String timeZoneId;
}
