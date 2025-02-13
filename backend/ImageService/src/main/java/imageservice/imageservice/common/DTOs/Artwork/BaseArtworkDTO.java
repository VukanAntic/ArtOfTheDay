package imageservice.imageservice.common.DTOs.Artwork;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BaseArtworkDTO {
    private String title;
    private String description;
    private String imageUrl;
}
