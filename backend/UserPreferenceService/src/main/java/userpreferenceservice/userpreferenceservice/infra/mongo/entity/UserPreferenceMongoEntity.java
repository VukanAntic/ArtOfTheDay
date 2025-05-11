package userpreferenceservice.userpreferenceservice.infra.mongo.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Document(collection = "user_preferences")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UserPreferenceMongoEntity {
    @Id
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
