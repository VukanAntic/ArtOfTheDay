package backend.nextimageservice.common.service;

import backend.nextimageservice.common.DTO.SeenImageDTO;
import backend.nextimageservice.common.repository.UserHistoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class NextImageService {
    private final UserHistoryRepository userHistoryRepository;

    public void SetPreferredTimeForUser(String username, String timeZoneId, int preferredUpdateTimeInHours, int preferredUpdateTimeInMinutes) {
        userHistoryRepository.setPreferredTimeForUser(username, timeZoneId, preferredUpdateTimeInHours, preferredUpdateTimeInMinutes);
    }

    public List<SeenImageDTO> getUserHistory(String username) {
        var userHistory = userHistoryRepository.getUserHistory(username);
        if (userHistory == null) {
            return List.of();
        }
        return userHistory.getSeenArtworks().stream()
                .map(SeenImageDTO::new)
                .collect(Collectors.toList());
    }

}
