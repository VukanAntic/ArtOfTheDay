package identityservice.identityservice.common.messaging.publishers;

import common.common.events.UserCreatedEvent;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class UserEventPublisher {

    @Value("${spring.rabbitmq.user_created_queue}")
    private String userCreatedQueue;

    @Value("${spring.rabbitmq.exchange}")
    private String exchange;

    private final RabbitTemplate rabbitTemplate;

    public UserEventPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void SendUserCreatedEvent(String username) {
        UserCreatedEvent userCreatedEvent = new UserCreatedEvent(username);
        rabbitTemplate.convertAndSend(exchange, userCreatedQueue , userCreatedEvent);
        System.out.println("Message sent successfully!: " + userCreatedEvent);
    }

}
