package userpreferenceservice.userpreferenceservice.infra.mongo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import userpreferenceservice.userpreferenceservice.infra.mongo.entity.UserPreferenceMongoEntity;

public interface UserPreferenceMongoRepository extends MongoRepository<UserPreferenceMongoEntity, String> {
}
