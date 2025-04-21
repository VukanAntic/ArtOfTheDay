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

    public Optional<User> getCurrentUser(CurrentUser principalUser) {
        return userRepository.findByUsername(principalUser.getUsername());
    }

    public Optional<User> changePassword(CurrentUser principalUser,
                                         String oldPassword, String newPassword) {
        var optionalUser = userRepository.findByUsername(principalUser.getUsername());
        if (optionalUser.isEmpty()) {
            return Optional.empty();
        }

        if (!passwordEncoder.matches(oldPassword, optionalUser.get().getPassword())) {
            return Optional.empty();
        }

        var user = optionalUser.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return Optional.of(user);
    }


    public Optional<User> changeEmail(CurrentUser principalUser, String newEmail) {
        var optionalUser = userRepository.findByUsername(principalUser.getUsername());
        if (optionalUser.isEmpty()) {
            return Optional.empty();
        }

        try {
            var user = optionalUser.get();
            user.setEmail(newEmail);
            userRepository.save(user);
            return Optional.of(user);
        }
        catch (DataIntegrityViolationException e) {
            return Optional.empty();
        }
    }

    public Optional<User> changeFirstAndLastName(CurrentUser principalUser, String newFirstName, String newLastName) {
        var optionalUser = userRepository.findByUsername(principalUser.getUsername());
        if (optionalUser.isEmpty()) {
            return Optional.empty();
        }

        try {
            var user = optionalUser.get();
            user.setFirstName(newFirstName);
            user.setLastName(newLastName);
            userRepository.save(user);
            return Optional.of(user);
        }
        catch (DataIntegrityViolationException e) {
            return Optional.empty();
        }
    }

    public Optional<User> deleteUser(CurrentUser principalUser, String sentUsername) {
        var optionalUser = userRepository.findByUsername(sentUsername);
        var principalUsername = principalUser.getUsername();
        var isDeletionValid = principalUsername != null && principalUsername.equals(sentUsername) && optionalUser.isPresent();
        if (!isDeletionValid) {
            return Optional.empty();
        }

        var user = optionalUser.get();

        try {
            userRepository.delete(user);
            return optionalUser;
        }
        catch (DataIntegrityViolationException e) {
            System.out.println(e.getMessage());
            return Optional.empty();
        }
    }
}
