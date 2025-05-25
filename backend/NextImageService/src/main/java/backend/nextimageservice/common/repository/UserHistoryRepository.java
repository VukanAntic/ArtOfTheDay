package backend.nextimageservice.common.repository;

import backend.nextimageservice.common.model.UserHistory;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface UserHistoryRepository {
    void delete(String username);
    void persist(String username);
    void setPreferredTimeForUser(String username,
                                 String timeZoneId,
                                 int preferredUpdateTimeInHours,
                                 int preferredUpdateTimeInMinutes);

    List<UserHistory> getAllUsers();
}
