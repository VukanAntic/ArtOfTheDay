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

    @PutMapping("/like-artwork")
    public void likeArtwork(@RequestBody LikeArtworkDTO likeArtworkDTO) {
    }

    @PutMapping("/dislike-artwork")
    public void dislikeArtwork(@RequestParam DislikeArtworkDTO dislikeArtworkDTO) {
    }

    @PutMapping("/add-favorite-genre")
    public void addFavoriteGenre(@RequestParam AddFavouriteGenreDTO addFavouriteGenreDTO) {
    }

    @PutMapping("/remove-favorite-genre")
    public void removeFavoriteGenre(@RequestParam RemoveFavouriteGenreDTO removeFavouriteGenre) {
    }

    // TODO [vukana] : Artworks seen as well

}
