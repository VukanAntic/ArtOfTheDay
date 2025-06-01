package backend.nextimageservice;

import backend.nextimageservice.common.model.SeenImage;
import backend.nextimageservice.common.model.UserHistory;
import jakarta.validation.constraints.AssertFalse;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;


@SpringBootTest(classes = {UserHistory.class})
public class UserHistoryTests {


    @Test
    public void ShouldAddFirstImageTest() {
        var userHistory = new UserHistory();
        userHistory.setTimeZoneId("Europe/Belgrade");
        assertTrue(userHistory.hasUpdateTimePassed());
        assertFalse(userHistory.hasAlreadyReceivedImageForToday());
    }

    @Test
    public void ShouldAddNextDayImageTest() {
        var userHistory = new UserHistory();
        userHistory.setTimeZoneId("Europe/Belgrade");
        var seenArtworks = new HashSet<SeenImage>();
        var seenImage = SeenImage.builder().artworkId(123)
                .seenAt(Instant.now().minus(1, ChronoUnit.DAYS).toEpochMilli())
                .build();
        seenArtworks.add(seenImage);
        userHistory.setSeenArtworks(seenArtworks);
        userHistory.setTimeZoneId("Europe/Belgrade");
        assertTrue(userHistory.hasUpdateTimePassed());
        assertFalse(userHistory.hasAlreadyReceivedImageForToday());
    }

    @Test
    public void ShouldNotAddImageForTodayTest() {
        var userHistory = new UserHistory();
        userHistory.setTimeZoneId("Europe/Belgrade");
        var zoneId = ZoneId.of(userHistory.getTimeZoneId());
        var seenArtworks = new HashSet<SeenImage>();
        LocalDate today = LocalDate.now(zoneId);
        LocalTime time = LocalTime.of(8, 59);
        LocalDateTime dateTime = LocalDateTime.of(today, time);
        var seenImage = SeenImage.builder().artworkId(123)
                .seenAt(dateTime.atZone(zoneId).toInstant().toEpochMilli())
                .build();
        seenArtworks.add(seenImage);
        userHistory.setSeenArtworks(seenArtworks);
        assertTrue(userHistory.hasUpdateTimePassed());
        assertFalse(userHistory.hasAlreadyReceivedImageForToday());
    }

}
