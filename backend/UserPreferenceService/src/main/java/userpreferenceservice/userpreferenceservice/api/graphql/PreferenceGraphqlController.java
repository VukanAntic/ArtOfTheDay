package userpreferenceservice.userpreferenceservice.api.graphql;

import common.common.authentication.AuthenticatedUser;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import userpreferenceservice.userpreferenceservice.common.model.AddToDBStatus;
import userpreferenceservice.userpreferenceservice.common.model.UserPreferences;
import userpreferenceservice.userpreferenceservice.common.service.UserPreferenceService;

@Controller
@AllArgsConstructor
public class PreferenceGraphqlController {

    private final UserPreferenceService userPreferenceService;

    @QueryMapping
    public UserPreferences preferences() {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            return null;
        }
        return userPreferenceService.getUserPreferences(username).orElse(null);
    }

    @MutationMapping
    public boolean addLikedArtwork(@Argument Long artworkId) {
        return userPreferenceService.addLikedArtworks(requireUsername(), artworkId) == AddToDBStatus.SUCCESS;
    }

    @MutationMapping
    public boolean removeLikedArtwork(@Argument Long artworkId) {
        return userPreferenceService.removeLikedArtworks(requireUsername(), artworkId) == AddToDBStatus.SUCCESS;
    }

    @MutationMapping
    public boolean addLikedGenre(@Argument String genreId) {
        return userPreferenceService.addLikedGenre(requireUsername(), genreId) == AddToDBStatus.SUCCESS;
    }

    @MutationMapping
    public boolean removeLikedGenre(@Argument String genreId) {
        return userPreferenceService.removeLikedGenre(requireUsername(), genreId) == AddToDBStatus.SUCCESS;
    }

    @MutationMapping
    public boolean addLikedArtist(@Argument Long artistId) {
        return userPreferenceService.addLikedArtist(requireUsername(), artistId) == AddToDBStatus.SUCCESS;
    }

    @MutationMapping
    public boolean removeLikedArtist(@Argument Long artistId) {
        return userPreferenceService.removeLikedArtist(requireUsername(), artistId) == AddToDBStatus.SUCCESS;
    }

    @MutationMapping
    public boolean addDislikedArtwork(@Argument String artworkId) {
        return userPreferenceService.addDislikedArtwork(requireUsername(), artworkId) == AddToDBStatus.SUCCESS;
    }

    @MutationMapping
    public boolean removeDislikedArtwork(@Argument String artworkId) {
        return userPreferenceService.removeDislikedArtwork(requireUsername(), artworkId) == AddToDBStatus.SUCCESS;
    }

    private String requireUsername() {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            throw new IllegalStateException("No authenticated user");
        }
        return username;
    }
}
