package common.common.events;

import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserCreatedEvent {
    private String username;
}
