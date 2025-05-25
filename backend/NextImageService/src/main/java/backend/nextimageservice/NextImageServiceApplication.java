package backend.nextimageservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class NextImageServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(NextImageServiceApplication.class, args);
    }

}
