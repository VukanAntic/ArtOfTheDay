package userpreferenceservice.userpreferenceservice.common.repository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import userpreferenceservice.userpreferenceservice.common.model.UserPreferences;
import userpreferenceservice.userpreferenceservice.infra.mongo.entity.UserPreferencesMongoEntity;
import userpreferenceservice.userpreferenceservice.infra.mongo.repository.UserPreferencesMongoRepository;

import java.util.Optional;

@Repository
@AllArgsConstructor
public class UserPreferenceRepository {

    private final UserPreferencesMongoRepository userPreferenceMongoRepository;

    public void persist(String username) {
        try {
            var userEntity = UserPreferencesMongoEntity.builder()
                    .username(username)
                    .build();
            userPreferenceMongoRepository.save(userEntity);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public Optional<UserPreferences> getUserPreferences(String username) {
        var userPreferencesEntityOptional = userPreferenceMongoRepository.findById(username);
        if (userPreferencesEntityOptional.isEmpty()) {
            return Optional.empty();
        }

        var userPreferencesEntity = userPreferencesEntityOptional.get();

        return  Optional.of(
                UserPreferences
                .builder()
                .username(userPreferencesEntity.getUsername())
                .allArtworksSeen(userPreferencesEntity.getAllArtworksSeen())
                .favoriteArtworkIds(userPreferencesEntity.getFavoriteArtworkIds())
                .favouriteArtistIds(userPreferencesEntity.getFavouriteArtistIds())
                .favouriteGenreIds(userPreferencesEntity.getFavouriteGenreIds())
                .build()
        );
    }
}
