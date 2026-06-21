package backend.nextimageservice.common.DTO;

import backend.nextimageservice.common.model.SeenImage;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SeenImageDTO {
    private long artworkId;
    private long seenAt;

    public SeenImageDTO(SeenImage seenImage) {
        this.artworkId = seenImage.getArtworkId();
        this.seenAt = seenImage.getSeenAt();
    }
}
