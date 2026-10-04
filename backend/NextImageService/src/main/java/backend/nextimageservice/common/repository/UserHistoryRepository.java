package backend.nextimageservice.common.repository;

import backend.nextimageservice.common.model.SeenImage;
import backend.nextimageservice.common.model.UserHistory;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface UserHistoryRepository {
    void delete(String username);
    void persist(String username, String timeZoneId);
    void setPreferredTimeForUser(String username,
                                 String timeZoneId,
                                 int preferredUpdateTimeInHours,
                                 int preferredUpdateTimeInMinutes);
    void setTimeZoneForUser(String username, String timeZoneId);
    void enableDeliveryForUser(String username);

    List<UserHistory> getAllUsers();
    void addNewImageForUserHistory(String username, SeenImage newSeenImageForUserHistory);
    UserHistory getUserHistory(String username);
}
