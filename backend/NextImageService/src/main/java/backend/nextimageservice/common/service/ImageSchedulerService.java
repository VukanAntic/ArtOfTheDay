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

    @Scheduled(cron = "0 * * * * *")
    public void checkShouldSendNewImage() {
        var allUserHistories = userHistoryRepository.getAllUsers();
        for (var userHistory : allUserHistories) {
            if (!userHistory.hasUpdateTimePassed() && userHistory.hasAlreadyReceivedImageForToday()) continue;

            addNewImageForUser(userHistory);
            System.out.println("Time for user!!" + userHistory);
        }
    }

    private void addNewImageForUser(UserHistory userHistory) {
        var newSeenImageForUserHistory = new SeenImage(123, Instant.now().toEpochMilli());
        userHistoryRepository.addNewImageForUserHistory(userHistory.getUsername(), newSeenImageForUserHistory);
    }

}
