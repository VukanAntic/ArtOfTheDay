package imageservice.imageservice.api.graphql;

import imageservice.imageservice.common.DTOs.Artist.IdentityArtistDTO;
import imageservice.imageservice.common.DTOs.Artwork.ArtworkDTO;
import imageservice.imageservice.common.DTOs.Artwork.IdentityArtworkDTO;
import imageservice.imageservice.common.DTOs.Genre.IdentityGenreDTO;
import imageservice.imageservice.common.services.ArtistService;
import imageservice.imageservice.common.services.ArtworkService;
import imageservice.imageservice.common.services.GenreService;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.HashSet;
import java.util.List;

@Controller
@AllArgsConstructor
public class ImageGraphqlController {

    private final ArtworkService artworkService;
    private final ArtistService artistService;
    private final GenreService genreService;

    @QueryMapping
    public List<ArtworkDTO> allArtworks() {
        return artworkService.getAllArtworks();
    }

    @QueryMapping
    public List<ArtworkDTO> artworksFromIds(@Argument List<Long> ids) {
        return artworkService.getAllArtworksFromIds(ids);
    }

    @QueryMapping
    public List<IdentityArtworkDTO> artworksFromGenre(@Argument String genreId) {
        return artworkService.getAllArtworks(genreId);
    }

    @QueryMapping
    public List<IdentityArtworkDTO> artworksFromArtist(@Argument Long artistId) {
        return artistService.getAllArtworksFromArtist(artistId);
    }

    @QueryMapping
    public List<IdentityGenreDTO> allGenres() {
        return genreService.getAllGenres();
    }

    @QueryMapping
    public List<IdentityArtistDTO> allArtists() {
        return artistService.getAllArtists();
    }

    @QueryMapping
    public List<IdentityGenreDTO> genresFromIds(@Argument List<String> ids) {
        return genreService.getAllGenresFromIds(ids);
    }

    @QueryMapping
    public List<IdentityArtistDTO> artistsFromIds(@Argument List<Long> ids) {
        return artistService.getAllArtistsByIds(ids);
    }

    @QueryMapping
    public List<ArtworkDTO> randomArtworks(@Argument int count) {
        return artworkService.getRandomArtworks(count);
    }

    @QueryMapping
    public Long randomArtworkId(@Argument List<Long> excludeIds) {
        return artworkService.getRandomArtworkIdExcluding(
                excludeIds == null ? null : new HashSet<>(excludeIds)
        ).orElse(null);
    }
}
