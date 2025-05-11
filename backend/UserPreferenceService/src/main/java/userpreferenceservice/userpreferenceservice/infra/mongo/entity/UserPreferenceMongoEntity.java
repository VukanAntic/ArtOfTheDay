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
    private Long userId;
    @Builder.Default
    private Set<String> favoriteArtworkIds = new HashSet<>();
    @Builder.Default
    private Set<String> favouriteGenreIds = new HashSet<>();
}
