package common.common.events;

import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserDeletedEvent {
    private String username;
}
