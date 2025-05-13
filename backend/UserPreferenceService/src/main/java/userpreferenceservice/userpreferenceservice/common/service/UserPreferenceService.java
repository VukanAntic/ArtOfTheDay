package userpreferenceservice.userpreferenceservice.common.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
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

    public void addLikedArtworks(String username, Long artworkId) {
        userPreferenceDBRepository.addLikedArtwork(username, artworkId);
    }

    public void removeLikedArtworks(String username, Long artworkId) {
        userPreferenceDBRepository.removeLikedArtworks(username, artworkId);
    }
}
