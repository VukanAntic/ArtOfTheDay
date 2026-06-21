package backend.nextimageservice.api.listener;

import backend.nextimageservice.common.service.NextImageService;
import common.common.events.UserCreatedEvent;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserCreatedEventHandler {
    private final NextImageService nextImageService;

    @RabbitListener(queues = "${spring.rabbitmq.user_created_queue}")
    public void receiveUserCreatedEvent(UserCreatedEvent userCreatedEvent) {
        System.out.println("Received event! " + userCreatedEvent);
        nextImageService.initializeUserHistory(userCreatedEvent.getUsername(), userCreatedEvent.getTimeZoneId());
    }
}