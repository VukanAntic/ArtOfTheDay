package backend.nextimageservice.common.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SetPreferredTimeForUpdateDTO {
    private int preferredTimeInMinutes;
    private int preferredTimeInHours;
}
