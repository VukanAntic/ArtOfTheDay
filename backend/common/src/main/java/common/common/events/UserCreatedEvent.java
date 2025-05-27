package common.common.events;

import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@ToString
@Builder
public class UserCreatedEvent {
    private String username;
    private String timeZoneId;
}
