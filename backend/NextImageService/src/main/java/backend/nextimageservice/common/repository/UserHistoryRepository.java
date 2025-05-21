package backend.nextimageservice.common.repository;

import org.springframework.stereotype.Repository;

@Repository
public interface UserHistoryRepository {
    void delete(String username);
    void persist(String username);
}
