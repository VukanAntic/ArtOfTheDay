package userpreferenceservice.userpreferenceservice.common.model;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
// TODO [vukana] : Some mapper?
public class UserPreferences {
    private String username;
    @Builder.Default
    private Set<Long> likedArtworkIds = new HashSet<>();
    @Builder.Default
    private Set<String> likedGenreIds = new HashSet<>();
    @Builder.Default
    private Set<String> dislikedArtworksIds = new HashSet<>();
    // TODO [vukana] : do we store this?
    @Builder.Default
    private Set<Long> likedArtistIds = new HashSet<>();
}
