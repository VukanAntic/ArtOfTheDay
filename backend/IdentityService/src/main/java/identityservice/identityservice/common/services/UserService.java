package identityservice.identityservice.common.services;

import identityservice.identityservice.common.DTOs.AuthenticationModel;
import identityservice.identityservice.common.DTOs.RefreshModelToken;
import identityservice.identityservice.common.DTOs.UserLoginDTO;
import identityservice.identityservice.common.DTOs.UserRegisterDTO;
import identityservice.identityservice.infra.entities.UserEntity;
import identityservice.identityservice.infra.repositories.UserRepository;
import identityservice.identityservice.infra.spring.JwtComponent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.*;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtComponent jwtComponent;

    public UserEntity registerUser(UserRegisterDTO userRegisterDTO) {
        UserEntity user = new UserEntity();
        user.setEmail(userRegisterDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userRegisterDTO.getPassword()));
        user.setFirstName(userRegisterDTO.getFirstName());
        user.setLastName(userRegisterDTO.getLastName());
        return userRepository.save(user);
    }

    public Optional<AuthenticationModel> loginUser(UserLoginDTO userLoginDTO) {

        var user = userRepository.findByEmail(userLoginDTO.getEmail());
        if (!checkIfIsCorrectUser(userLoginDTO, user)){
            return Optional.empty();
        }

        return jwtComponent.generateNewTokens(userLoginDTO.getEmail());
    }

    public Optional<AuthenticationModel> refreshTokens(RefreshModelToken refreshModelToken) {

        var user = userRepository.findByEmail(refreshModelToken.getEmail());
        if (user.isEmpty()) {
            return Optional.empty();
        }

        if (!jwtComponent.validateToken(refreshModelToken.getRefreshToken())) {
            return Optional.empty();
        }

        return jwtComponent.generateNewTokens(refreshModelToken.getEmail());
    }

    private boolean checkIfIsCorrectUser(UserLoginDTO attemptedUserData, Optional<UserEntity> realUserData) {

        if (realUserData.isEmpty()) {
            return false;
        }

        var userDetails = realUserData.get();

        return passwordEncoder.matches(attemptedUserData.getPassword(), userDetails.getPassword());
    }

}
