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
public class UserPreferencesMongoEntity {
    @Id
    private String username;
    @Builder.Default
    private Set<Long> likedArtworkIds = new HashSet<>();
    @Builder.Default
    private Set<String> likedGenreIds = new HashSet<>();
    // TODO [vukana] : do we store this?
    @Builder.Default
    private Set<Long> likedArtistIds = new HashSet<>();
}
