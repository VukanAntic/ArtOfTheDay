package common.common.events;

import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Builder
public class NewImageReadyEvent {
    private String username;
    private long artworkId;
}