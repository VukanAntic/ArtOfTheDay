package backend.nextimageservice.common.model;

import backend.nextimageservice.infra.mongo.entity.UserHistoryMongoEntity;
import lombok.*;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class UserHistory {
    private String username;
    @Builder.Default
    private Set<SeenImage> seenArtworks = new HashSet<>();
    @Builder.Default
    private int preferredTimeForUpdateInMinutes = 0;
    @Builder.Default
    private int preferredTimeForUpdateInHours = 9;
    private String timeZoneId;

    public UserHistory(UserHistoryMongoEntity userHistoryMongoEntity) {
        username = userHistoryMongoEntity.getUsername();
        seenArtworks = new HashSet<>(userHistoryMongoEntity.getSeenArtworks());
        preferredTimeForUpdateInHours = userHistoryMongoEntity.getPreferredTimeForUpdateInHours();
        preferredTimeForUpdateInMinutes = userHistoryMongoEntity.getPreferredTimeForUpdateInMinutes();
        timeZoneId = userHistoryMongoEntity.getTimeZoneId();
    }

    public boolean hasUpdateTimePassed() {
        var nowUtc = Instant.now();
        ZoneId userZone = ZoneId.of(timeZoneId);
        ZonedDateTime nowUserZone = nowUtc.atZone(userZone);
        ZonedDateTime preferredDateTime = nowUserZone
                .withHour(preferredTimeForUpdateInHours)
                .withMinute(preferredTimeForUpdateInMinutes)
                .withSecond(0)
                .withNano(0);

        return nowUserZone.isAfter(preferredDateTime);
    }
}
