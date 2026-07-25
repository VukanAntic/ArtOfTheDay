package userpreferenceservice.userpreferenceservice.api.listener;

import common.common.events.FtueCompletedEvent;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import userpreferenceservice.userpreferenceservice.common.service.UserPreferenceService;

@Component
@AllArgsConstructor
public class FtueCompletedEventHandler {

    private final UserPreferenceService userPreferenceService;

    @RabbitListener(queues = "${spring.rabbitmq.ftue_completed_queue}")
    public void receiveFtueCompletedEvent(FtueCompletedEvent event) {
        System.out.println("Received event! " + event);
        var username = event.getUsername();

        if (event.getArtworkIds() != null) {
            for (Long artworkId : event.getArtworkIds()) {
                userPreferenceService.addLikedArtworks(username, artworkId);
            }
        }
        if (event.getGenreIds() != null) {
            for (String genreId : event.getGenreIds()) {
                userPreferenceService.addLikedGenre(username, genreId);
            }
        }
        if (event.getArtistIds() != null) {
            for (Long artistId : event.getArtistIds()) {
                userPreferenceService.addLikedArtist(username, artistId);
            }
        }
    }
}
