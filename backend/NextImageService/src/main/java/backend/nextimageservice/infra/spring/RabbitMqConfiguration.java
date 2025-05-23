package backend.nextimageservice.infra.spring;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfiguration {

    @Value("${spring.rabbitmq.user_created_queue}")
    private String userCreatedQueueName;

    @Value("${spring.rabbitmq.user_deleted_queue}")
    private String userDeletedQueueName;

    @Value("${spring.rabbitmq.exchange_name}")
    private String exchangeName;

    @Value("${spring.rabbitmq.user_created_routing_key}")
    private String userCreatedRoutingKey;

    @Value("${spring.rabbitmq.user_deleted_routing_key}")
    private String userDeletedRoutingKey;


    @Bean
    public Queue userCreatedQueue() {
        return new Queue(userCreatedQueueName, true);
    }

    @Bean
    public Queue userDeletedQueue() {
        return new Queue(userDeletedQueueName, true);
    }

    @Bean
    public TopicExchange userEventsExchange() {
        return new TopicExchange(exchangeName);
    }

    @Bean
    public Binding userCreatedBinding(Queue userCreatedQueue, TopicExchange userEventsExchange) {
        return BindingBuilder.bind(userCreatedQueue).to(userEventsExchange).with(userCreatedRoutingKey);
    }

    @Bean
    public Binding userDeletedBinding(Queue userDeletedQueue, TopicExchange userEventsExchange) {
        return BindingBuilder.bind(userDeletedQueue).to(userEventsExchange).with(userDeletedRoutingKey);
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(ConnectionFactory connectionFactory, MessageConverter messageConverter) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(messageConverter);
        return factory;
    }
}
