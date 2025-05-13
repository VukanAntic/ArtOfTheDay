package userpreferenceservice.userpreferenceservice.api.listener;

import common.common.events.UserCreatedEvent;
import common.common.events.UserDeletedEvent;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import userpreferenceservice.userpreferenceservice.common.repository.UserPreferenceRepository;

@Component
@AllArgsConstructor
public class UserCreatedEventHandler {

    private final UserPreferenceRepository userPreferenceRepository;

    @RabbitListener(queues = "${spring.rabbitmq.user_created_queue}" )
    public void receiveUserCreatedEvent(UserCreatedEvent userCreatedEvent) {
        System.out.println("Received event! " + userCreatedEvent);
        userPreferenceRepository.persist(userCreatedEvent.getUsername());
    }


    @RabbitListener(queues = "${spring.rabbitmq.user_deleted_queue}" )
    public void receiveUserDeletedEvent(UserDeletedEvent userDeletedEvent) {
        System.out.println("Received event! " + userDeletedEvent);
        userPreferenceRepository.delete(userDeletedEvent.getUsername());
    }
}
