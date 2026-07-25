package identityservice.identityservice.common.services;

import identityservice.identityservice.api.publishers.UserEventPublisher;
import identityservice.identityservice.common.DTOs.FtueCompleteDTO;
import identityservice.identityservice.infra.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TutorialService {

    private final UserRepository userRepository;
    private final UserEventPublisher userEventPublisher;

    public boolean completeFtue(String username, FtueCompleteDTO request) {
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
        userEventPublisher.publishFtueCompletedEvent(
                username,
                request.getArtworkIds(),
                request.getGenreIds(),
                request.getArtistIds());
        return true;
    }
}
