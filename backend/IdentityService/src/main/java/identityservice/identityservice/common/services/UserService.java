package identityservice.identityservice.common.services;

import identityservice.identityservice.infra.repositories.UserRepository;
import org.springframework.stereotype.Service;
import lombok.*;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void registerUser(User user) {}

    public void loginUser(User user) {}

}
