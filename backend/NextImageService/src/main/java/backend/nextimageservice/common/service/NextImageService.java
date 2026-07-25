package backend.nextimageservice.common.service;

import backend.nextimageservice.common.DTO.SeenImageDTO;
import backend.nextimageservice.common.model.SeenImage;
import backend.nextimageservice.common.repository.UserHistoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class NextImageService {
    private static final int INITIAL_SEED_COUNT = 10;
    private static final int FTUE_PICK_COUNT = 4;

    private final UserHistoryRepository userHistoryRepository;
    private final NextImageSelectionService nextImageSelectionService;

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

    public void initializeUserHistory(String username, String timeZoneId) {
        userHistoryRepository.persist(username, timeZoneId);
        seedImages(username, new HashSet<>(), INITIAL_SEED_COUNT, ChronoUnit.DAYS, -(INITIAL_SEED_COUNT + FTUE_PICK_COUNT));
    }

    public void seedImagesAfterFtue(String username, List<Long> likedArtworkIds) {
        if (likedArtworkIds == null || likedArtworkIds.isEmpty()) {
            return;
        }
        long now = Instant.now().toEpochMilli();
        long dayMillis = ChronoUnit.DAYS.getDuration().toMillis();
        int count = likedArtworkIds.size();
        for (int i = 0; i < count; i++) {
            long seenAt = now - (long) (count - i) * dayMillis;
            userHistoryRepository.addNewImageForUserHistory(username, new SeenImage(likedArtworkIds.get(i), seenAt));
        }
    }

    private void seedImages(String username, Set<Long> seenIds, int count, ChronoUnit unit, long startOffset) {
        for (int i = 0; i < count; i++) {
            try {
                long artworkId = nextImageSelectionService.selectNextArtworkId(username, seenIds);
                long seenAt = Instant.now().plus(startOffset + i, unit).toEpochMilli();
                userHistoryRepository.addNewImageForUserHistory(username, new SeenImage(artworkId, seenAt));
                seenIds.add(artworkId);
            } catch (Exception e) {
                System.out.println("Failed to seed image " + i + " for user " + username + ": " + e.getMessage());
            }
        }
    }
}
