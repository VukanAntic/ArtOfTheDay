package userpreferenceservice.userpreferenceservice.common.messaging.listener;

import common.common.events.UserCreatedEvent;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class UserCreatedEventHandler {

    @RabbitListener(queues = "${spring.rabbitmq.user_created_queue}" )
    public void receiveUserCreatedEvent(UserCreatedEvent userCreatedEvent) {
        System.out.println(userCreatedEvent);
        // add user to db!
    }

}
