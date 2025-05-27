package backend.nextimageservice.common.model;

import backend.nextimageservice.infra.mongo.entity.UserHistoryMongoEntity;
import lombok.*;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Optional;
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
        var preferredDateTimeInUserZone = getPreferredDateTimeInUserZone(nowUtc);
        ZonedDateTime nowUserZone = getTimeInUserZone(nowUtc);

        return nowUserZone.isAfter(preferredDateTimeInUserZone);
    }


    public boolean hasAlreadyReceivedImageForToday() {
        var lastSeenImage = getLastSeenImage();
        if (lastSeenImage.isEmpty()) {
            // TODO [vukana] : WHen this is the case, we should add like 10 images
            return false;
        }

        var nowUtc = Instant.now();
        Instant lastImageSeenAtInstant = Instant.ofEpochMilli(lastSeenImage.get().getSeenAt());
        var preferredTimeInUserZone = getPreferredDateTimeInUserZone(nowUtc).toInstant();
        return lastImageSeenAtInstant.isAfter(preferredTimeInUserZone);
    }

    private Optional<SeenImage> getLastSeenImage() {
        return seenArtworks.stream()
                .max(Comparator.comparingLong(SeenImage::getSeenAt));
    }

    private ZonedDateTime getPreferredDateTimeInUserZone(Instant nowUtc) {
        ZonedDateTime nowUserZone = getTimeInUserZone(nowUtc);
        return nowUserZone
                .withHour(preferredTimeForUpdateInHours)
                .withMinute(preferredTimeForUpdateInMinutes)
                .withSecond(0)
                .withNano(0);
    }

    private ZonedDateTime getTimeInUserZone(Instant nowUtc) {
        ZoneId userZone = ZoneId.of(timeZoneId);
        return nowUtc.atZone(userZone);
    }
}
