package backend.nextimageservice.api.publishers;

import common.common.events.NewImageReadyEvent;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class NextImageEventPublisher {

    @Value("${spring.rabbitmq.exchange_name}")
    private String exchangeName;

    @Value("${spring.rabbitmq.new_image_ready_routing_key}")
    private String newImageReadyRoutingKey;

    private final RabbitTemplate rabbitTemplate;

    public NextImageEventPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishNewImageEvent(String username, long artworkId) {
        var event = NewImageReadyEvent.builder()
                .username(username)
                .artworkId(artworkId)
                .build();
        rabbitTemplate.convertAndSend(exchangeName, newImageReadyRoutingKey, event);
    }
}
