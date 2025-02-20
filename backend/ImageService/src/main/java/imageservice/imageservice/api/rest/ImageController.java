package imageservice.imageservice.api.rest;

import imageservice.imageservice.common.DTOs.Artist.IdentityArtistDTO;
import imageservice.imageservice.common.DTOs.Artwork.ArtworkDTO;
import imageservice.imageservice.common.DTOs.Artwork.IdentityArtworkDTO;
import imageservice.imageservice.common.DTOs.Genre.GenreDTO;
import imageservice.imageservice.common.DTOs.Genre.IdentityGenreDTO;
import imageservice.imageservice.common.services.ArtistService;
import imageservice.imageservice.common.services.ArtworkService;
import imageservice.imageservice.common.services.GenreService;
import imageservice.imageservice.infra.enitites.Genre;
import imageservice.imageservice.infra.repositories.ArtworkRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/images", produces = {
        "application/json",
        "application/x-protobuf"
})
@AllArgsConstructor
public class ImageController {


    private final ArtworkService artworkService;
    private final ArtistService artistService;
    private final GenreService genreService;


    @GetMapping("/get-all-artworks")
    public List<ArtworkDTO> getAllArtworks() {
        return artworkService.getAllArtworks();
    }

    @GetMapping("/get-artworks-from-genre")
    public List<IdentityArtworkDTO> getAllArtworksFromGenre(@RequestParam String genreId) {
        return artworkService.getAllArtworks(genreId);
    }

    @GetMapping("/get-artworks-from-artist")
    public List<IdentityArtworkDTO> getAllArtworksFromArtist(Long artistId) {
        return artistService.getAllArtworksFromArtist(artistId);
    }

    @GetMapping("/get-artworks-from-ids")
    public List<ArtworkDTO> getAllArtworksFromIds(@RequestParam List<Long> artworkIds) {
        return artworkService.getAllArtworksFromIds(artworkIds);
    }

    @GetMapping("get-all-genres")
    public List<IdentityGenreDTO> getAllGenres() {
        return genreService.getAllGenres();
    }

    @GetMapping("get-all-genres-from-ids")
    public List<IdentityGenreDTO> getAllGenresByIds(@RequestParam List<String> genreIds) {
        return genreService.getAllGenresFromIds(genreIds);
    }

    @GetMapping("get-all-artists")
    public List<IdentityArtistDTO> getAllArtists() {
        return artistService.getAllArtists();
    }

    @GetMapping("get-all-artists-from-ids")
    public List<IdentityArtistDTO> getAllArtistsByIds(@RequestParam List<Long> artistIds) {
        return artistService.getAllArtistsByIds(artistIds);
    }
}
