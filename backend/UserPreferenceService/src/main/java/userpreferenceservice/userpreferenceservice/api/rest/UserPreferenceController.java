package userpreferenceservice.userpreferenceservice.api.rest;

import common.common.authentication.AuthenticatedUser;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import userpreferenceservice.userpreferenceservice.common.DTO.*;
import userpreferenceservice.userpreferenceservice.common.model.UserPreferences;
import userpreferenceservice.userpreferenceservice.common.service.UserPreferenceService;

import java.util.Optional;

@RestController
@RequestMapping(value = "/api/preference", produces = {
        "application/json",
        "application/x-protobuf"
})
@AllArgsConstructor
public class UserPreferenceController {

    private final UserPreferenceService userPreferenceService;

    @GetMapping("/get")
    public Optional<UserPreferences> get() {
        var username = AuthenticatedUser.getUsername();
        return userPreferenceService.getUserPreferences(username);
    }

    @PutMapping("/add-liked-artwork")
    public void likeArtwork(@RequestBody AddLikedArtworkDTO addLikedArtworksDTO) {
        var username = AuthenticatedUser.getUsername();
        userPreferenceService.addToLikedArtworks(username, addLikedArtworksDTO.getArtworkId());
    }

    @PutMapping("/remove-liked-artwork")
    public void dislikeArtwork(@RequestParam RemoveLikedArtworkDTO removeLikedArtworksDTO) {
        var username = AuthenticatedUser.getUsername();
        userPreferenceService.removeFromLikedArtworks(username, removeLikedArtworksDTO.getArtworkId());
    }


    // have a list of all the artworks the user disliked, so we can show smth not similar
//    @PutMapping("/add-disliked-artwork")
//    public void dislikeArtwork(@RequestParam RemoveLikedArtworkDTO removeLikedArtworksDTO) {
//        var username = AuthenticatedUser.getUsername();
//        userPreferenceService.removeFromLikedArtworks(username, removeLikedArtworksDTO.getArtworkId());
//    }

    @PutMapping("/add-favorite-genre")
    public void addFavoriteGenre(@RequestParam AddFavouriteGenreDTO addFavouriteGenreDTO) {
    }

    @PutMapping("/remove-favorite-genre")
    public void removeFavoriteGenre(@RequestParam RemoveFavouriteGenreDTO removeFavouriteGenre) {
    }
}
