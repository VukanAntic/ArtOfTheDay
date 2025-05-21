package backend.nextimageservice.infra.mongo.repository;

import backend.nextimageservice.infra.mongo.entity.UserHistoryMongoEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserHistoryMongoRepository  extends MongoRepository<UserHistoryMongoEntity, String> {
}
