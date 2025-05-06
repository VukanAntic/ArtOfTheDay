package userpreferenceservice.userpreferenceservice.infra.mongo.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document(collection = "user_preferences")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UserPreferenceMongoEntity {
    @Id
    private String userId;
    private Set<String> favoriteArtworkIds;
    private Set<String> favouriteGenreIds;
}
