package imageservice.imageservice.common.DTOs.Artwork;

import imageservice.imageservice.common.DTOs.Artist.IdentityArtistDTO;
import imageservice.imageservice.common.DTOs.Genre.IdentityGenreDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArtworkDTO extends IdentityArtworkDTO {
    private IdentityArtistDTO artist;
    private Set<IdentityGenreDTO> genres;
}
