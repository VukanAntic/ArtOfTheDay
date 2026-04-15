package backend.nextimageservice.infra.client;

import backend.nextimageservice.common.dto.ArtworkIdentityDTO;
import backend.nextimageservice.infra.spring.ServiceJwtComponent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Component
public class ImageServiceClient {

    @Value("${services.image.url}")
    private String imageServiceUrl;

    private final RestTemplate restTemplate;
    private final ServiceJwtComponent serviceJwtComponent;

    public ImageServiceClient(RestTemplate restTemplate, ServiceJwtComponent serviceJwtComponent) {
        this.restTemplate = restTemplate;
        this.serviceJwtComponent = serviceJwtComponent;
    }

    public List<ArtworkIdentityDTO> getArtworksByGenre(String genreId) {
        var url = UriComponentsBuilder
                .fromHttpUrl(imageServiceUrl + ImageServiceEndpoints.GET_ARTWORKS_BY_GENRE)
                .queryParam("genreId", genreId)
                .toUriString();
        return fetchList(url);
    }

    public List<ArtworkIdentityDTO> getArtworksByArtist(Long artistId) {
        var url = UriComponentsBuilder
                .fromHttpUrl(imageServiceUrl + ImageServiceEndpoints.GET_ARTWORKS_BY_ARTIST)
                .queryParam("artistId", artistId)
                .toUriString();
        return fetchList(url);
    }

    public Optional<Long> getRandomArtworkId(Set<Long> excludeIds) {
        var builder = UriComponentsBuilder
                .fromHttpUrl(imageServiceUrl + ImageServiceEndpoints.GET_RANDOM_ARTWORK_ID);
        excludeIds.forEach(id -> builder.queryParam("excludeIds", id));

        var response = restTemplate.exchange(
                builder.toUriString(),
                HttpMethod.GET,
                new HttpEntity<>(authHeaders()),
                Long.class
        );
        return Optional.ofNullable(response.getBody());
    }

    private List<ArtworkIdentityDTO> fetchList(String url) {
        var response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                new HttpEntity<>(authHeaders()),
                new ParameterizedTypeReference<List<ArtworkIdentityDTO>>() {}
        );
        var body = response.getBody();
        return body != null ? body : Collections.emptyList();
    }

    private HttpHeaders authHeaders() {
        var headers = new HttpHeaders();
        headers.setBearerAuth(serviceJwtComponent.generateServiceToken());
        return headers;
    }
}
