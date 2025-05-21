package backend.nextimageservice.api.listener;

import backend.nextimageservice.common.repository.UserHistoryRepository;
import common.common.events.UserCreatedEvent;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserCreatedEventHandler {
    private final UserHistoryRepository userHistoryRepository;

    @RabbitListener(queues = "${spring.rabbitmq.user_created_queue}" )
    public void receiveUserCreatedEvent(UserCreatedEvent userCreatedEvent) {
        System.out.println("Received event! " + userCreatedEvent);
        userHistoryRepository.persist(userCreatedEvent.getUsername());
    }
}