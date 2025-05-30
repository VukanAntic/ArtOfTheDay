package backend.nextimageservice.infra.mongo.entity;

import backend.nextimageservice.common.model.SeenImage;
import lombok.*;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Document(collection = "user_history")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UserHistoryMongoEntity {
    @Id
    private String username;
    @Builder.Default
    private Set<SeenImage> seenArtworks = new HashSet<>();
    @Builder.Default
    private int preferredTimeForUpdateInMinutes = 0;
    @Builder.Default
    private int preferredTimeForUpdateInHours = 9;
    private String timeZoneId;
}
