package backend.nextimageservice.common.model;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class SeenImage {
    private long artworkId;
    private long seenAt;
}
