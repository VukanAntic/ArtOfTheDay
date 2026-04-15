package backend.nextimageservice.common.service;

import backend.nextimageservice.common.dto.ArtworkIdentityDTO;
import backend.nextimageservice.common.dto.UserPreferencesDTO;
import backend.nextimageservice.infra.client.ImageServiceClient;
import backend.nextimageservice.infra.client.UserPreferenceServiceClient;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

@Service
@AllArgsConstructor
public class NextImageSelectionService {

    private final UserPreferenceServiceClient userPreferenceServiceClient;
    private final ImageServiceClient imageServiceClient;
    private final SelectionProbabilityConfig probabilityConfig;
    private final Random random = new Random();

    public long selectNextArtworkId(String username, Set<Long> seenArtworkIds) {
        var preferences = userPreferenceServiceClient.getUserPreferences(username);
        boolean hasGenres = !preferences.getLikedGenreIds().isEmpty();
        boolean hasArtists = !preferences.getLikedArtistIds().isEmpty();

        if ((!hasGenres && !hasArtists) || random.nextDouble() < probabilityConfig.getRandomImageProbability()) {
            return getRandomUnseen(seenArtworkIds, preferences);
        }

        boolean tryGenreFirst = hasGenres && (!hasArtists || random.nextDouble() < probabilityConfig.getGenreVsArtistProbability());

        Optional<Long> result = tryGenreFirst
                ? tryFromGenre(preferences, seenArtworkIds)
                : tryFromArtist(preferences, seenArtworkIds);

        return result.orElseGet(() -> getRandomUnseen(seenArtworkIds, preferences));
    }

    private Optional<Long> tryFromGenre(UserPreferencesDTO preferences, Set<Long> seenArtworkIds) {
        var genreIds = new ArrayList<>(preferences.getLikedGenreIds());
        var genreId = genreIds.get(random.nextInt(genreIds.size()));
        return pickUnseen(imageServiceClient.getArtworksByGenre(genreId), seenArtworkIds, preferences);
    }

    private Optional<Long> tryFromArtist(UserPreferencesDTO preferences, Set<Long> seenArtworkIds) {
        var artistIds = new ArrayList<>(preferences.getLikedArtistIds());
        var artistId = artistIds.get(random.nextInt(artistIds.size()));
        return pickUnseen(imageServiceClient.getArtworksByArtist(artistId), seenArtworkIds, preferences);
    }

    private Optional<Long> pickUnseen(List<ArtworkIdentityDTO> artworks, Set<Long> seenArtworkIds, UserPreferencesDTO preferences) {
        var excluded = excludedIds(seenArtworkIds, preferences);
        var unseen = artworks.stream()
                .map(ArtworkIdentityDTO::getId)
                .filter(id -> !excluded.contains(id))
                .toList();

        if (unseen.isEmpty()) return Optional.empty();
        return Optional.of(unseen.get(random.nextInt(unseen.size())));
    }

    private long getRandomUnseen(Set<Long> seenArtworkIds, UserPreferencesDTO preferences) {
        return imageServiceClient.getRandomArtworkId(excludedIds(seenArtworkIds, preferences))
                .orElseThrow(() -> new IllegalStateException("No artworks available"));
    }

    private Set<Long> excludedIds(Set<Long> seenArtworkIds, UserPreferencesDTO preferences) {
        var excluded = new HashSet<>(seenArtworkIds);
        preferences.getDislikedArtworksIds().stream()
                .map(Long::parseLong)
                .forEach(excluded::add);
        return excluded;
    }
}
