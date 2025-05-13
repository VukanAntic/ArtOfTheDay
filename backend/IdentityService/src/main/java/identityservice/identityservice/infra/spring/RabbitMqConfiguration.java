package identityservice.identityservice.infra.spring;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.core.Queue;

@Configuration
public class RabbitMqConfiguration {

    @Value("${spring.rabbitmq.user_created_queue}")
    private String userCreatedQueueName;

    @Value("${spring.rabbitmq.user_deleted_queue}")
    private String userDeletedQueueName;

    @Value("${spring.rabbitmq.exchange}")
    private String exchange;

    @Bean
    public Queue userCreatedQueue() {
        return new Queue(userCreatedQueueName, false);
    }
    @Bean
    public Queue userDeletedQueue() {
        return new Queue(userDeletedQueueName, false);
    }

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(exchange);
    }

    @Bean
    public Binding userCreatedBinding(Queue userCreatedQueue, TopicExchange exchange) {
        return BindingBuilder.bind(userCreatedQueue).to(exchange).with(userCreatedQueueName);
    }

    @Bean
    public Binding userDeletedBinding(Queue userDeletedQueue, TopicExchange exchange) {
        return BindingBuilder.bind(userDeletedQueue).to(exchange).with(userDeletedQueueName);
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public AmqpTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }
}
