package userpreferenceservice.userpreferenceservice.common.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import userpreferenceservice.userpreferenceservice.infra.mongo.entity.UserPreferencesMongoEntity;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UserPreferences {
    private String username;
    @Builder.Default
    private Set<String> favoriteArtworkIds = new HashSet<>();
    @Builder.Default
    private Set<String> favouriteGenreIds = new HashSet<>();
    // TODO [vukana] : do we store this?
    @Builder.Default
    private Set<String> favouriteArtistIds = new HashSet<>();
    @Builder.Default
    private Set<String> allArtworksSeen = new HashSet<>();
}
