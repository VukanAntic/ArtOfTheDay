package identityservice.identityservice.common.services;

import identityservice.identityservice.common.DTOs.UserLoginDTO;
import identityservice.identityservice.common.DTOs.UserRegisterDTO;
import identityservice.identityservice.infra.entities.UserEntity;
import identityservice.identityservice.infra.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.*;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserEntity registerUser(UserRegisterDTO userRegisterDTO) {
        UserEntity user = new UserEntity();
        user.setEmail(userRegisterDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userRegisterDTO.getPassword()));
        user.setFirstName(userRegisterDTO.getFirstName());
        user.setLastName(userRegisterDTO.getLastName());
        return userRepository.save(user);
    }

    public void loginUser(UserLoginDTO userLoginDTO) {

    }

}
