package backend.nextimageservice.common.service;

import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ImageNotificationService {
    private final SimpMessagingTemplate messagingTemplate;

    public void sendBroadcastForUserWithNewImage(long artworkIdOfNextImage, String username) {
        messagingTemplate.convertAndSendToUser(username, "/queue/new-image", artworkIdOfNextImage);
    }

    public void sendPushNotificationForUserWithNewImage(long artworkIdOfNextImage) {

    }
}
