package userpreferenceservice.userpreferenceservice.api.rest;

import common.common.authentication.AuthenticatedUser;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import userpreferenceservice.userpreferenceservice.common.DTO.*;
import userpreferenceservice.userpreferenceservice.common.model.AddToDBStatus;
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
    public ResponseEntity<Optional<UserPreferences>> get() {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userPreferenceService.getUserPreferences(username));
    }

    @PutMapping("/add-liked-artwork")
    public ResponseEntity<Void> addLikedArtwork(@RequestBody AddLikedArtworkDTO addLikedArtworksDTO) {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            return ResponseEntity.notFound().build();
        }
        return userPreferenceService.addLikedArtworks(username, addLikedArtworksDTO.getArtworkId()) == AddToDBStatus.SUCCESS
                ? ResponseEntity.ok().build()
                : ResponseEntity.badRequest().build();    }

    @PutMapping("/remove-liked-artwork")
    public ResponseEntity<Void> RemoveLikedArtwork(@RequestBody RemoveLikedArtworkDTO removeLikedArtworksDTO) {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            return ResponseEntity.notFound().build();
        }
        return userPreferenceService.removeLikedArtworks(username, removeLikedArtworksDTO.getArtworkId()) == AddToDBStatus.SUCCESS
                ? ResponseEntity.ok().build()
                : ResponseEntity.badRequest().build();
    }

    @PutMapping("/add-liked-genre")
    public ResponseEntity<Void> addLikedGenre(@RequestBody AddLikedGenreDTO addLikedGenreDTO) {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            return ResponseEntity.notFound().build();
        }
        return userPreferenceService.addLikedGenre(username, addLikedGenreDTO.getGenreId()) == AddToDBStatus.SUCCESS
                ? ResponseEntity.ok().build()
                : ResponseEntity.badRequest().build();
    }

    @PutMapping("/remove-liked-genre")
    public ResponseEntity<Void> removeLikedGenre(@RequestBody RemoveLikedGenreDTO removeLikedGenreDTO) {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            return ResponseEntity.notFound().build();
        }
        return userPreferenceService.removeLikedGenre(username, removeLikedGenreDTO.getGenreId()) == AddToDBStatus.SUCCESS
                ? ResponseEntity.ok().build()
                : ResponseEntity.badRequest().build();
    }

    @PutMapping("/add-disliked-artwork")
    public ResponseEntity<Void> addDislikedImage(@RequestBody AddDislikedArtworkDTO addDislikedArtworkDTO) {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            return ResponseEntity.notFound().build();
        }
        return userPreferenceService.addDislikedArtwork(username, addDislikedArtworkDTO.getArtworkId()) == AddToDBStatus.SUCCESS
                ? ResponseEntity.ok().build()
                : ResponseEntity.badRequest().build();
    }

    @PutMapping("/remove-disliked-artwork")
    public ResponseEntity<Void> removeDislikedArtwork(@RequestBody RemoveDislikedArtworkDTO removeDislikedArtworkDTO) {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            return ResponseEntity.notFound().build();
        }
        return userPreferenceService.removeDislikedArtwork(username, removeDislikedArtworkDTO.getArtworkId()) == AddToDBStatus.SUCCESS
                ? ResponseEntity.ok().build()
                : ResponseEntity.badRequest().build();
    }

    @PutMapping("/add-liked-artist")
    public ResponseEntity<Void> addLikedArtist(@RequestBody AddLikedArtistDTO addLikedArtistDTO) {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            return ResponseEntity.notFound().build();
        }
        return userPreferenceService.addLikedArtist(username, addLikedArtistDTO.getArtistId()) == AddToDBStatus.SUCCESS
                ? ResponseEntity.ok().build()
                : ResponseEntity.badRequest().build();
    }

    @PutMapping("/remove-liked-artist")
    public ResponseEntity<Void> removeLikedArtist(@RequestBody RemoveLikedArtistDTO removeLikedArtistDTO) {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            return ResponseEntity.notFound().build();
        }
        return userPreferenceService.removeLikedArtist(username, removeLikedArtistDTO.getArtistId()) == AddToDBStatus.SUCCESS
                ? ResponseEntity.ok().build()
                : ResponseEntity.badRequest().build();
    }
}
