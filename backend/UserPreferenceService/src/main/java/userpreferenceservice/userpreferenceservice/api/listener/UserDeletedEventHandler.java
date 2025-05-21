package userpreferenceservice.userpreferenceservice.api.listener;

import common.common.events.UserDeletedEvent;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import userpreferenceservice.userpreferenceservice.common.repository.UserPreferenceRepository;

@Component
@AllArgsConstructor
public class UserDeletedEventHandler {
    private final UserPreferenceRepository userPreferenceRepository;

    @RabbitListener(queues = "${spring.rabbitmq.user_deleted_queue}" )
    public void receiveUserDeletedEvent(UserDeletedEvent userDeletedEvent) {
        System.out.println("Received event! " + userDeletedEvent);
        userPreferenceRepository.delete(userDeletedEvent.getUsername());
    }
}
