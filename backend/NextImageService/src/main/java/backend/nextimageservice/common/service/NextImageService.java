package backend.nextimageservice.common.service;

import backend.nextimageservice.common.repository.UserHistoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class NextImageService {
    private final UserHistoryRepository userHistoryRepository;

    public void SetPreferredTimeForUser(String username, String timeZoneId, int preferredUpdateTimeInHours, int preferredUpdateTimeInMinutes) {
        userHistoryRepository.setPreferredTimeForUser(username, timeZoneId, preferredUpdateTimeInHours, preferredUpdateTimeInMinutes);
    }

}
