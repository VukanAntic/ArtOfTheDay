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

    @Override
    public AddToDBStatus addDislikedArtwork(String username, String artworkId) {
        var userEntityOptional = userPreferenceMongoRepository.findById(username);
        if (userEntityOptional.isEmpty()) {
            return AddToDBStatus.FAILURE;
        }

        var userEntity = userEntityOptional.get();
        var dislikedArtworkIds = userEntity.getDislikedArtworksIds();
        dislikedArtworkIds.add(artworkId);
        userEntity.setDislikedArtworksIds(dislikedArtworkIds);
        userPreferenceMongoRepository.save(userEntity);
        return AddToDBStatus.SUCCESS;
    }

    @Override
    public AddToDBStatus removeDislikedArtwork(String username, String artworkId) {
        var userEntityOptional = userPreferenceMongoRepository.findById(username);
        if (userEntityOptional.isEmpty()) {
            return AddToDBStatus.FAILURE;
        }

        var userEntity = userEntityOptional.get();
        var dislikedArtworkIds = userEntity.getDislikedArtworksIds();
        dislikedArtworkIds.remove(artworkId);
        userEntity.setDislikedArtworksIds(dislikedArtworkIds);
        userPreferenceMongoRepository.save(userEntity);
        return AddToDBStatus.SUCCESS;
    }

    @Override
    public AddToDBStatus addLikedArtist(String username, Long artistId) {
        var userEntityOptional = userPreferenceMongoRepository.findById(username);
        if (userEntityOptional.isEmpty()) {
            return AddToDBStatus.FAILURE;
        }

        var userEntity = userEntityOptional.get();
        var likedArtistIds = userEntity.getLikedArtistIds();
        likedArtistIds.add(artistId);
        userEntity.setLikedArtistIds(likedArtistIds);
        userPreferenceMongoRepository.save(userEntity);
        return AddToDBStatus.SUCCESS;
    }

    @Override
    public AddToDBStatus removeLikedArtist(String username, Long artistId) {
        var userEntityOptional = userPreferenceMongoRepository.findById(username);
        if (userEntityOptional.isEmpty()) {
            return AddToDBStatus.FAILURE;
        }

        var userEntity = userEntityOptional.get();
        var likedArtistIds = userEntity.getLikedArtistIds();
        likedArtistIds.remove(artistId);
        userEntity.setLikedArtistIds(likedArtistIds);
        userPreferenceMongoRepository.save(userEntity);
        return AddToDBStatus.SUCCESS;
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
                .dislikedArtworksIds(userPreferencesEntity.getDislikedArtworksIds())
                .likedGenreIds(userPreferencesEntity.getLikedGenreIds())
                .build()
        );
    }
}
