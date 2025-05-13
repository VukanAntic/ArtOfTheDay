package userpreferenceservice.userpreferenceservice.common.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import userpreferenceservice.userpreferenceservice.common.model.AddToDBStatus;
import userpreferenceservice.userpreferenceservice.common.model.UserPreferences;
import userpreferenceservice.userpreferenceservice.common.repository.UserPreferenceRepository;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserPreferenceService {

    private final UserPreferenceRepository userPreferenceDBRepository;

    public Optional<UserPreferences> getUserPreferences(String username) {
        return userPreferenceDBRepository.getUserPreferences(username);
    }

    public AddToDBStatus addLikedArtworks(String username, Long artworkId) {
        return userPreferenceDBRepository.addLikedArtwork(username, artworkId);
    }

    public AddToDBStatus removeLikedArtworks(String username, Long artworkId) {
        return userPreferenceDBRepository.removeLikedArtworks(username, artworkId);
    }

    public AddToDBStatus addLikedGenre(String username, String genreId) {
        return userPreferenceDBRepository.addLikedGenre(username, genreId);
    }

    public AddToDBStatus removeLikedGenre(String username, String genreId) {
        return userPreferenceDBRepository.removeLikedGenre(username, genreId);
    }
}
