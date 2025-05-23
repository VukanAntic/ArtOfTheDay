package backend.nextimageservice.common.repository;

import backend.nextimageservice.infra.mongo.entity.UserHistoryMongoEntity;
import backend.nextimageservice.infra.mongo.repository.UserHistoryMongoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class UserHistoryDBRepository implements UserHistoryRepository {

    private final UserHistoryMongoRepository userHistoryMongoRepository;

    @Override
    public void persist(String username) {
        try {
            var userEntity = UserHistoryMongoEntity.builder()
                    .username(username)
                    .build();
            userHistoryMongoRepository.save(userEntity);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @Override
    public void delete(String username) {
        try {
            userHistoryMongoRepository.deleteById(username);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

}
