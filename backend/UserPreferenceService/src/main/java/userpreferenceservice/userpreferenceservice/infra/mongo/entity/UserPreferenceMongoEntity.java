package userpreferenceservice.userpreferenceservice.infra.mongo.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user_preferences")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UserPreferenceMongoEntity {
    @Id
    private String userId;
}
