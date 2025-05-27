package backend.nextimageservice.common.service;

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

    @Scheduled(cron = "0 * * * * *")
    public void checkShouldSendNewImage() {
        var allUserHistories = userHistoryRepository.getAllUsers();
        for (var userHistory : allUserHistories) {
            if (!userHistory.hasUpdateTimePassed() && userHistory.hasAlreadyReceivedImageForToday()) continue;

            var artworkIdOfNextImage = addNewImageForUser(userHistory);
            imageNotificationService.sendBroadcastForUserWithNewImage(artworkIdOfNextImage, userHistory.getUsername());
            imageNotificationService.sendPushNotificationForUserWithNewImage(artworkIdOfNextImage);
        }
    }

    private long addNewImageForUser(UserHistory userHistory) {
        long artworkIdOfNextImage = getNNextArtworkidForUserHistory();
        var newSeenImageForUserHistory = new SeenImage(artworkIdOfNextImage, Instant.now().toEpochMilli());
        userHistoryRepository.addNewImageForUserHistory(userHistory.getUsername(), newSeenImageForUserHistory);
        return artworkIdOfNextImage;
    }

    private long getNNextArtworkidForUserHistory() {
        return 132L;
    }

}
