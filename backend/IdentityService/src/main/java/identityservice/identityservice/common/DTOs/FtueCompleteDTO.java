package identityservice.identityservice.common.DTOs;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FtueCompleteDTO {
    private List<Long> artworkIds;
    private List<String> genreIds;
    private List<Long> artistIds;
}
