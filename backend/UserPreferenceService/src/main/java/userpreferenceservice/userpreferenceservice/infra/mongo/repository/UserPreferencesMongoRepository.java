package userpreferenceservice.userpreferenceservice.infra.mongo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import userpreferenceservice.userpreferenceservice.infra.mongo.entity.UserPreferencesMongoEntity;

public interface UserPreferencesMongoRepository extends MongoRepository<UserPreferencesMongoEntity, String> {
}
