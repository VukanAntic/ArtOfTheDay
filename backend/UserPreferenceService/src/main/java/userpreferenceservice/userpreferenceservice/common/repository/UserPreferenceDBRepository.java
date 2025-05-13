package userpreferenceservice.userpreferenceservice.common.repository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import userpreferenceservice.userpreferenceservice.common.model.AddToDBStatus;
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

    // TODO [vukana] : Add/Remove one method?
    @Override
    public AddToDBStatus addLikedArtwork(String username, Long artworkId) {
        var userEntityOptional = userPreferenceMongoRepository.findById(username);
        if (userEntityOptional.isEmpty()) {
            return AddToDBStatus.FAILURE;
        }

        var userEntity = userEntityOptional.get();
        var likedArtworkIds = userEntity.getLikedArtworkIds();
        likedArtworkIds.add(artworkId);
        userEntity.setLikedArtworkIds(likedArtworkIds);
        userPreferenceMongoRepository.save(userEntity);
        return AddToDBStatus.SUCCESS;
    }

    @Override
    public AddToDBStatus removeLikedArtworks(String username, Long artworkId) {
        var userEntityOptional = userPreferenceMongoRepository.findById(username);
        if (userEntityOptional.isEmpty()) {
            return AddToDBStatus.FAILURE;
        }

        var userEntity = userEntityOptional.get();
        var likedArtworkIds = userEntity.getLikedArtworkIds();
        likedArtworkIds.remove(artworkId);
        userEntity.setLikedArtworkIds(likedArtworkIds);
        userPreferenceMongoRepository.save(userEntity);
        return AddToDBStatus.SUCCESS;
    }

    // TODO [vukana] : Add/Remove one method?
    @Override
    public AddToDBStatus removeLikedGenre(String username, String genreId) {
        var userEntityOptional = userPreferenceMongoRepository.findById(username);
        if (userEntityOptional.isEmpty()) {
            return AddToDBStatus.FAILURE;
        }

        var userEntity = userEntityOptional.get();
        var likedGenreIds = userEntity.getLikedGenreIds();
        likedGenreIds.add(genreId);
        userEntity.setLikedGenreIds(likedGenreIds);
        userPreferenceMongoRepository.save(userEntity);
        return AddToDBStatus.SUCCESS;
    }

    @Override
    public AddToDBStatus addLikedGenre(String username, String genreId) {
        var userEntityOptional = userPreferenceMongoRepository.findById(username);
        if (userEntityOptional.isEmpty()) {
            return AddToDBStatus.FAILURE;
        }

        var userEntity = userEntityOptional.get();
        var likedGenreIds = userEntity.getLikedGenreIds();
        likedGenreIds.remove(genreId);
        userEntity.setLikedGenreIds(likedGenreIds);
        userPreferenceMongoRepository.save(userEntity);
        return AddToDBStatus.SUCCESS;
    }

    @Override
    public void delete(String username) {
        try {
            userPreferenceMongoRepository.deleteById(username);
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
                .likedArtworkIds(userPreferencesEntity.getLikedArtworkIds())
                .likedArtistIds(userPreferencesEntity.getLikedArtistIds())
                .likedGenreIds(userPreferencesEntity.getLikedGenreIds())
                .build()
        );
    }
}
