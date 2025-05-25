package backend.nextimageservice.common.repository;

import backend.nextimageservice.common.model.UserHistory;
import backend.nextimageservice.infra.mongo.entity.UserHistoryMongoEntity;
import backend.nextimageservice.infra.mongo.repository.UserHistoryMongoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

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
    public void setPreferredTimeForUser(String username, String timeZoneId, int preferredUpdateTimeInHours, int preferredUpdateTimeInMinutes) {
        try {
            var userEntityOptional = userHistoryMongoRepository.findById(username);
            var userEntity = userEntityOptional.orElse(null);
            if (userEntityOptional.isEmpty()) {
                // if the user doesnt exists, its probably some error, make the necessary object for the user
                userEntity = UserHistoryMongoEntity.builder().username(username).build();
            }
            userEntity.setTimeZoneId(timeZoneId);
            userEntity.setPreferredTimeForUpdateInHours(preferredUpdateTimeInHours);
            userEntity.setPreferredTimeForUpdateInMinutes(preferredUpdateTimeInMinutes);
            userHistoryMongoRepository.save(userEntity);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @Override
    public List<UserHistory> getAllUsers() {
        return userHistoryMongoRepository
                .findAll()
                .stream()
                .map(userHistoryMongoEntity -> new UserHistory(userHistoryMongoEntity))
                .toList();
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
