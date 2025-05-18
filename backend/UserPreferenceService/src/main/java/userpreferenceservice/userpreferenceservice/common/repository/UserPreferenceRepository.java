package userpreferenceservice.userpreferenceservice.common.repository;

import userpreferenceservice.userpreferenceservice.common.model.AddToDBStatus;
import userpreferenceservice.userpreferenceservice.common.model.UserPreferences;

import java.util.Optional;

public interface UserPreferenceRepository {
    Optional<UserPreferences> getUserPreferences(String username);
    void persist(String username);
    AddToDBStatus addLikedArtwork(String username, Long artworkId);
    AddToDBStatus removeLikedArtworks(String username, Long artworkId);
    AddToDBStatus removeLikedGenre(String username, String genreId);
    AddToDBStatus addLikedGenre(String username, String genreId);
    void delete(String username);
    AddToDBStatus addDislikedArtwork(String username, String artworkId);
    AddToDBStatus removeDislikedArtwork(String username, String artworkId);
}
