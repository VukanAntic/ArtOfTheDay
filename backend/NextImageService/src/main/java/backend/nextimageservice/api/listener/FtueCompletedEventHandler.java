package backend.nextimageservice.api.listener;

import backend.nextimageservice.common.service.NextImageService;
import common.common.events.FtueCompletedEvent;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class FtueCompletedEventHandler {

    private final NextImageService nextImageService;

    @RabbitListener(queues = "${spring.rabbitmq.ftue_completed_queue}")
    public void receiveFtueCompletedEvent(FtueCompletedEvent event) {
        System.out.println("Received event! " + event);
        nextImageService.seedImagesAfterFtue(event.getUsername());
    }
}
