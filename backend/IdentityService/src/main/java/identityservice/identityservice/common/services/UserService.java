package identityservice.identityservice.common.services;

import identityservice.identityservice.common.Tokens.CurrentUser;
import identityservice.identityservice.infra.entities.User;
import identityservice.identityservice.infra.repositories.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.*;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Optional<User> getCurrentUser(CurrentUser currentUser) {
        return userRepository.findByUsername(currentUser.getUsername());
    }

    public Optional<User> changePassword(CurrentUser currentUser, String oldPassword, String newPassword) {
        var possibleUserData = userRepository.findByEmail(currentUser.getEmail());
        if (possibleUserData.isEmpty()) {
            return Optional.empty();
        }

        if (!passwordEncoder.matches(oldPassword, possibleUserData.get().getPassword())) {
            return Optional.empty();
        }

        var user = possibleUserData.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return Optional.of(user);
    }


    public Optional<User> changeEmail(CurrentUser currentUser, String newEmail) {
        var possibleUserData = userRepository.findByEmail(currentUser.getEmail());
        if (possibleUserData.isEmpty()) {
            return Optional.empty();
        }

        try {
            var user = possibleUserData.get();
            user.setEmail(newEmail);
            userRepository.save(user);
            return Optional.of(user);
        }
        catch (DataIntegrityViolationException e) {
            return Optional.empty();
        }
    }
}
