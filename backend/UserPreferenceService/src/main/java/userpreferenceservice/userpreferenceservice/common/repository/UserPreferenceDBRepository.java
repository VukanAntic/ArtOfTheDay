package userpreferenceservice.userpreferenceservice.common.repository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import userpreferenceservice.userpreferenceservice.common.model.UserPreferences;
import userpreferenceservice.userpreferenceservice.infra.mongo.entity.UserPreferencesMongoEntity;
import userpreferenceservice.userpreferenceservice.infra.mongo.repository.UserPreferencesMongoRepository;

import java.util.Optional;

@Repository
@AllArgsConstructor
public class UserPreferenceDBRepository implements UserPreferenceRepository {

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

    @Override
    public void addLikedArtwork(String username, Long artworkId) {
        var userEntityOptional = userPreferenceMongoRepository.findById(username);
        if (userEntityOptional.isEmpty()) {
            return;
        }

        var userEntity = userEntityOptional.get();
        var likedArtworkIds = userEntity.getLikedArtworkIds();
        likedArtworkIds.add(artworkId);
        userEntity.setLikedArtworkIds(likedArtworkIds);
        userPreferenceMongoRepository.save(userEntity);
    }

    @Override
    public void removeLikedArtworks(String username, Long artworkId) {
        var userEntityOptional = userPreferenceMongoRepository.findById(username);
        if (userEntityOptional.isEmpty()) {
            return;
        }

        var userEntity = userEntityOptional.get();
        var likedArtworkIds = userEntity.getLikedArtworkIds();
        likedArtworkIds.remove(artworkId);
        userEntity.setLikedArtworkIds(likedArtworkIds);
        userPreferenceMongoRepository.save(userEntity);
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
                .favoriteArtworkIds(userPreferencesEntity.getLikedArtworkIds())
                .favouriteArtistIds(userPreferencesEntity.getLikedArtistIds())
                .favouriteGenreIds(userPreferencesEntity.getLikedGenreIds())
                .build()
        );
    }
}
