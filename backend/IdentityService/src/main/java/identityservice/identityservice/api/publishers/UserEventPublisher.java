package identityservice.identityservice.api.publishers;

import common.common.events.UserCreatedEvent;
import common.common.events.UserDeletedEvent;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class UserEventPublisher {

    @Value("${spring.rabbitmq.user_created_queue}")
    private String userCreatedQueue;
    @Value("${spring.rabbitmq.user_deleted_queue}")
    private String userDeletedQueue;

    @Value("${spring.rabbitmq.exchange}")
    private String exchange;

    private final RabbitTemplate rabbitTemplate;

    public UserEventPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishUserCreatedEvent(String username) {
        UserCreatedEvent userCreatedEvent = new UserCreatedEvent(username);
        rabbitTemplate.convertAndSend(exchange, userCreatedQueue , userCreatedEvent);
        System.out.println("Message sent successfully!: " + userCreatedEvent);
    }

    public void publishUserDeletedEvent(String username) {
        var userDeletedEvent = new UserDeletedEvent(username);
        rabbitTemplate.convertAndSend(exchange, userDeletedQueue , userDeletedEvent);
        System.out.println("Message sent successfully!: " + userDeletedEvent);
    }
}
