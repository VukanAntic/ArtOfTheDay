package userpreferenceservice.userpreferenceservice.common.repository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import userpreferenceservice.userpreferenceservice.infra.mongo.entity.UserPreferenceMongoEntity;
import userpreferenceservice.userpreferenceservice.infra.mongo.repository.UserPreferenceMongoRepository;

@Repository
@AllArgsConstructor
public class UserPreferenceRepository {

    private final UserPreferenceMongoRepository userPreferenceMongoRepository;

    public void persist(Long userId) {
        try {
            var userEntity = UserPreferenceMongoEntity.builder().userId(userId).build();
            userPreferenceMongoRepository.save(userEntity);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

}
