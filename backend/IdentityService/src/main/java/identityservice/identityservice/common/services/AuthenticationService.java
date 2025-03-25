package identityservice.identityservice.common.services;

import identityservice.identityservice.infra.repositories.UserRepository;
import org.springframework.stereotype.Service;
import lombok.*;

@Service
@AllArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;


}

