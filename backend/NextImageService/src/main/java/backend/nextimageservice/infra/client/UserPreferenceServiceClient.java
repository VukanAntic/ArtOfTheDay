package backend.nextimageservice.infra.client;

import backend.nextimageservice.common.dto.UserPreferencesDTO;
import backend.nextimageservice.infra.spring.ServiceJwtComponent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class UserPreferenceServiceClient {

    @Value("${services.user-preference.url}")
    private String userPreferenceServiceUrl;

    private final RestTemplate restTemplate;
    private final ServiceJwtComponent serviceJwtComponent;

    public UserPreferenceServiceClient(RestTemplate restTemplate, ServiceJwtComponent serviceJwtComponent) {
        this.restTemplate = restTemplate;
        this.serviceJwtComponent = serviceJwtComponent;
    }

    public UserPreferencesDTO getUserPreferences(String username) {
        try {
            var url = userPreferenceServiceUrl + UserPreferenceServiceEndpoints.GET_PREFERENCES;

            var headers = new HttpHeaders();
            headers.setBearerAuth(serviceJwtComponent.generateTokenForUser(username));
            var entity = new HttpEntity<>(headers);

            var response = restTemplate.exchange(url, HttpMethod.GET, entity, UserPreferencesDTO.class);
            var body = response.getBody();
            return body != null ? body : new UserPreferencesDTO();
        } catch (Exception e) {
            System.out.println("Could not fetch preferences for " + username + ", using empty preferences: " + e.getMessage());
            return new UserPreferencesDTO();
        }
    }
}
