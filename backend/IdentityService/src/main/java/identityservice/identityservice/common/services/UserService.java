package identityservice.identityservice.common.services;

import identityservice.identityservice.common.DTOs.*;
import identityservice.identityservice.infra.entities.User;
import identityservice.identityservice.infra.repositories.UserRepository;
import identityservice.identityservice.infra.spring.JwtUtilComponent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.*;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtilComponent jwtUtilComponent;

    public Optional<User> registerUser(UserRegisterDTO userRegisterDTO) {
        User user = new User();
        if (!userRegisterDTO.getPassword().equals(userRegisterDTO.getConfirmPassword())) {
            return Optional.empty();
        }
        user.setUsername(userRegisterDTO.getUsername());
        user.setEmail(userRegisterDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userRegisterDTO.getPassword()));
        user.setFirstName(userRegisterDTO.getFirstName());
        user.setLastName(userRegisterDTO.getLastName());
        return Optional.of(userRepository.save(user));
    }

    public Optional<AuthenticationDTO> loginUser(UserLoginDTO userLoginDTO) {

        var user = userRepository.findByUsername(userLoginDTO.getUsername());
        if (!checkIfIsCorrectUser(userLoginDTO, user)){
            return Optional.empty();
        }

        return jwtUtilComponent.generateNewTokens(userLoginDTO.getUsername());
    }

    public Optional<AuthenticationDTO> refreshTokens(RefreshTokenDTO refreshTokenDTO) {

        var username = jwtUtilComponent.extractUsername(refreshTokenDTO.getRefreshToken());

        var user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return Optional.empty();
        }

        if (!jwtUtilComponent.validateToken(refreshTokenDTO.getRefreshToken(), refreshTokenDTO.getUsername())) {
            return Optional.empty();
        }

        return jwtUtilComponent.generateNewTokens(username);
    }

    private boolean checkIfIsCorrectUser(UserLoginDTO attemptedUserData, Optional<User> realUserData) {

        if (realUserData.isEmpty()) {
            return false;
        }

        var userDetails = realUserData.get();

        return passwordEncoder.matches(attemptedUserData.getPassword(), userDetails.getPassword());
    }

}
