package identityservice.identityservice.common.services;

import common.common.events.UserCreatedEvent;
import identityservice.identityservice.common.DTOs.AuthenticationDTO;
import identityservice.identityservice.common.DTOs.RefreshTokenDTO;
import identityservice.identityservice.common.DTOs.UserLoginDTO;
import identityservice.identityservice.common.DTOs.UserRegisterDTO;
import identityservice.identityservice.common.messaging.publishers.UserEventPublisher;
import identityservice.identityservice.infra.entities.User;
import identityservice.identityservice.infra.repositories.UserRepository;
import identityservice.identityservice.infra.spring.JwtUtilComponent;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class IdentityService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtilComponent jwtUtilComponent;
    private final UserEventPublisher userEventPublisher;

    // TODO [vukana] : Should these methods take in dtos?
    //  When we do other ways of client/backend communication it would be cool to use all the same methods
    public Optional<User> registerUser(UserRegisterDTO userRegisterDTO) {
        if (!userRegisterDTO.getPassword().equals(userRegisterDTO.getConfirmPassword())) {
            return Optional.empty();
        }

        // TODO [vukana] : We should make a User class, that isnt connected to grpc, this way, if i were to
        //  change the db, it would be tricky!
        User user = User.builder()
                .username(userRegisterDTO.getUsername())
                .email(userRegisterDTO.getEmail())
                .password(passwordEncoder.encode(userRegisterDTO.getPassword()))
                .firstName(userRegisterDTO.getFirstName())
                .lastName(userRegisterDTO.getLastName())
                .build();
        try {
            userRepository.save(user);
            userEventPublisher.SendUserCreatedEvent(user.getUsername());
            return Optional.of(user);
        }
        catch (DataIntegrityViolationException e) {
            System.out.println(e.getMessage());
            return Optional.empty();
        }
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
        if (username == null) {
            return Optional.empty();
        }
        var user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
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
