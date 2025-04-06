package identityservice.identityservice.common.services;

import identityservice.identityservice.common.DTOs.AuthenticationDTO;
import identityservice.identityservice.common.DTOs.RefreshTokenDTO;
import identityservice.identityservice.common.DTOs.UserLoginDTO;
import identityservice.identityservice.common.DTOs.UserRegisterDTO;
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
        user.setEmail(userRegisterDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userRegisterDTO.getPassword()));
        user.setFirstName(userRegisterDTO.getFirstName());
        user.setLastName(userRegisterDTO.getLastName());
        return Optional.of(userRepository.save(user));
    }

    public Optional<AuthenticationDTO> loginUser(UserLoginDTO userLoginDTO) {

        var user = userRepository.findByEmail(userLoginDTO.getEmail());
        if (!checkIfIsCorrectUser(userLoginDTO, user)){
            return Optional.empty();
        }

        return jwtUtilComponent.generateNewTokens(userLoginDTO.getEmail());
    }

    public Optional<AuthenticationDTO> refreshTokens(RefreshTokenDTO refreshTokenDTO) {

        var userEmail = jwtUtilComponent.extractEmail(refreshTokenDTO.getRefreshToken());

        var user = userRepository.findByEmail(userEmail);
        if (user.isEmpty()) {
            return Optional.empty();
        }

        if (!jwtUtilComponent.validateToken(refreshTokenDTO.getRefreshToken(), refreshTokenDTO.getEmail())) {
            return Optional.empty();
        }

        return jwtUtilComponent.generateNewTokens(userEmail);
    }

    private boolean checkIfIsCorrectUser(UserLoginDTO attemptedUserData, Optional<User> realUserData) {

        if (realUserData.isEmpty()) {
            return false;
        }

        var userDetails = realUserData.get();

        return passwordEncoder.matches(attemptedUserData.getPassword(), userDetails.getPassword());
    }

}
