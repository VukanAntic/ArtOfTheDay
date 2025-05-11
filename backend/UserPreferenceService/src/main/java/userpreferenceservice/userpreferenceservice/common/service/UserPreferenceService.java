package userpreferenceservice.userpreferenceservice.common.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import userpreferenceservice.userpreferenceservice.common.model.UserPreferences;
import userpreferenceservice.userpreferenceservice.common.repository.UserPreferenceRepository;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserPreferenceService {

    private final UserPreferenceRepository userPreferenceRepository;

    public Optional<UserPreferences> getUserPreferences(String username) {
        return userPreferenceRepository.getUserPreferences(username);
    }
}
