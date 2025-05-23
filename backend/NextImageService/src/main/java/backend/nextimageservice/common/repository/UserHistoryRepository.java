package backend.nextimageservice.common.repository;

import org.springframework.stereotype.Repository;

public interface UserHistoryRepository {
    void delete(String username);
    void persist(String username);
}
