package backend.nextimageservice.api.listener;

import backend.nextimageservice.common.repository.UserHistoryRepository;
import common.common.events.UserDeletedEvent;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserDeletedEventHandler {
    private final UserHistoryRepository userHistoryRepository;

    @RabbitListener(queues = "${spring.rabbitmq.user_deleted_queue}" )
    public void receiveUserDeletedEvent(UserDeletedEvent userDeletedEvent) {
        System.out.println("Received event! " + userDeletedEvent);
        userHistoryRepository.delete(userDeletedEvent.getUsername());
    }
}