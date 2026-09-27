package backend.nextimageservice.common.DTO;

import backend.nextimageservice.common.model.UserHistory;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public class UserHistoryDTO {
    private List<SeenImageDTO> seenImages;
    private int preferredTimeInHours;
    private int preferredTimeInMinutes;

    public UserHistoryDTO(UserHistory userHistory) {
        this.seenImages = userHistory.getSeenArtworks().stream()
                .map(SeenImageDTO::new)
                .collect(Collectors.toList());
        this.preferredTimeInHours = userHistory.getPreferredTimeForUpdateInHours();
        this.preferredTimeInMinutes = userHistory.getPreferredTimeForUpdateInMinutes();
    }
}
