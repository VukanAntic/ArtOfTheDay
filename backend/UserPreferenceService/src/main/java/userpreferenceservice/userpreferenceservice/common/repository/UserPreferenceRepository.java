package userpreferenceservice.userpreferenceservice.common.repository;

import userpreferenceservice.userpreferenceservice.common.model.UserPreferences;

import java.util.Optional;

public interface UserPreferenceRepository {
    Optional<UserPreferences> getUserPreferences(String username);
    void persist(String username);
}
