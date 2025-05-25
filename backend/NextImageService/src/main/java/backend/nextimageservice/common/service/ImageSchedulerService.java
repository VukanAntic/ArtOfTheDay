package backend.nextimageservice.common.service;

import backend.nextimageservice.common.repository.UserHistoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ImageSchedulerService {

    private final UserHistoryRepository userHistoryRepository;

    @Scheduled(cron = "0 * * * * *")
    public void checkShouldSendNewImage() {
        var allUsers = userHistoryRepository.getAllUsers();
        for (var user : allUsers) {
            if (!user.hasUpdateTimePassed()) continue;

            System.out.println("Time for user!!" + user);
        }
    }

}
