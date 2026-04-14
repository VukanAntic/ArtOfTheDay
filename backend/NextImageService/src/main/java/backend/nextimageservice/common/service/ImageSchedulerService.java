package backend.nextimageservice.common.service;

import backend.nextimageservice.api.publishers.NextImageEventPublisher;
import backend.nextimageservice.common.model.SeenImage;
import backend.nextimageservice.common.model.UserHistory;
import backend.nextimageservice.common.repository.UserHistoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@AllArgsConstructor
public class ImageSchedulerService {

    private final UserHistoryRepository userHistoryRepository;
    private final ImageNotificationService imageNotificationService;
    private final NextImageEventPublisher nextImageEventPublisher;

    @Scheduled(cron = "0 * * * * *")
    public void checkShouldSendNewImage() {
        var allUserHistories = userHistoryRepository.getAllUsers();
        for (var userHistory : allUserHistories) {
            if (!userHistory.hasUpdateTimePassed() || userHistory.hasAlreadyReceivedImageForToday()) continue;

            String username = userHistory.getUsername();
            System.out.println("Sending image for user: "  + username + " in time " + Instant.now());
            var artworkIdOfNextImage = addNewImageForUser(userHistory);
            imageNotificationService.sendBroadcastForUserWithNewImage(artworkIdOfNextImage, username);

            nextImageEventPublisher.publishNewImageEvent(username, artworkIdOfNextImage);
        }
    }

    private long addNewImageForUser(UserHistory userHistory) {
        long artworkIdOfNextImage = getNNextArtworkIdForUserHistory();
        var newSeenImageForUserHistory = new SeenImage(artworkIdOfNextImage, Instant.now().toEpochMilli());
        userHistoryRepository.addNewImageForUserHistory(userHistory.getUsername(), newSeenImageForUserHistory);
        return artworkIdOfNextImage;
    }

    private long getNNextArtworkIdForUserHistory() {
        return 132L;
    }

}
