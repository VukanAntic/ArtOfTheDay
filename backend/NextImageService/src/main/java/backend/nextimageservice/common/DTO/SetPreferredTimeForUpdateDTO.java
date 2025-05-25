package backend.nextimageservice.common.DTO;

import lombok.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SetPreferredTimeForUpdateDTO {
    @Min(0)
    @Max(60)
    private int preferredTimeInMinutes;
    @Min(0)
    @Max(24)
    private int preferredTimeInHours;
}
