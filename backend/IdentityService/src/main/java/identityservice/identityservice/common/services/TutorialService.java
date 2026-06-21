package identityservice.identityservice.common.services;

import identityservice.identityservice.api.publishers.UserEventPublisher;
import identityservice.identityservice.infra.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TutorialService {

    private final UserRepository userRepository;
    private final UserEventPublisher userEventPublisher;

    public boolean completeFtue(String username) {
        var optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            return false;
        }

        var user = optionalUser.get();
        if (user.isFtueCompleted()) {
            return false;
        }

        user.setFtueCompleted(true);
        userRepository.save(user);
        userEventPublisher.publishFtueCompletedEvent(username);
        return true;
    }
}
