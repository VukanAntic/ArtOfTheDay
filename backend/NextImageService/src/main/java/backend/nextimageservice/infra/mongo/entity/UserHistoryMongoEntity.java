package backend.nextimageservice.infra.mongo.entity;

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
    private Set<Long> artworkSeenIds = new HashSet<>();
    // TODO [vukana] : Find a way to pick the next 10 or smth
}
