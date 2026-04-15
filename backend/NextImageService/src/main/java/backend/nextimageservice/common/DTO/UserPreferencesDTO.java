package backend.nextimageservice.common.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class UserPreferencesDTO {
    private Set<Long> likedArtworkIds = new HashSet<>();
    private Set<String> likedGenreIds = new HashSet<>();
    private Set<String> dislikedArtworksIds = new HashSet<>();
    private Set<Long> likedArtistIds = new HashSet<>();
}
