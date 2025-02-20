package imageservice.imageservice.api.rest;

import imageservice.imageservice.common.DTOs.Artwork.ArtworkDTO;
import imageservice.imageservice.common.DTOs.Artwork.IdentityArtworkDTO;
import imageservice.imageservice.common.services.ArtistService;
import imageservice.imageservice.common.services.ArtworkService;
import imageservice.imageservice.infra.repositories.ArtworkRepository;
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
public class ImageController {


    private final ArtworkService artworkService;
    private final ArtistService artistService;

    @Autowired
    public ImageController(ArtworkService artworkService, ArtistService artistService) {
        this.artworkService = artworkService;
        this.artistService = artistService;
    }

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


}
