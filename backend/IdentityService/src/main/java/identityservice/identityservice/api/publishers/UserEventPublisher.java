package identityservice.identityservice.api.publishers;

import common.common.events.UserCreatedEvent;
import common.common.events.UserDeletedEvent;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class UserEventPublisher {

    @Value("${spring.rabbitmq.user_created_routing_key}")
    private String userCreatedRoutingKey;

    @Value("${spring.rabbitmq.user_deleted_routing_key}")
    private String userDeletedRoutingKey;

    @Value("${spring.rabbitmq.exchange_name}")
    private String userEventsExchange;

    private final RabbitTemplate rabbitTemplate;

    public UserEventPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishUserCreatedEvent(String username) {
        UserCreatedEvent userCreatedEvent = new UserCreatedEvent(username);
        rabbitTemplate.convertAndSend(userEventsExchange, userCreatedRoutingKey, userCreatedEvent);
        System.out.println("Message sent successfully!: " + userCreatedEvent);
    }

    public void publishUserDeletedEvent(String username) {
        var userDeletedEvent = new UserDeletedEvent(username);
        rabbitTemplate.convertAndSend(userEventsExchange, userDeletedRoutingKey, userDeletedEvent);
        System.out.println("Message sent successfully!: " + userDeletedEvent);
    }
}
