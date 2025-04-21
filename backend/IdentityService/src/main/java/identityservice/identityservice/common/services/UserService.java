package identityservice.identityservice.common.services;

import identityservice.identityservice.common.DTOs.*;
import identityservice.identityservice.infra.entities.User;
import identityservice.identityservice.infra.repositories.UserRepository;
import identityservice.identityservice.infra.spring.JwtUtilComponent;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.*;

import java.sql.SQLException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {



}
