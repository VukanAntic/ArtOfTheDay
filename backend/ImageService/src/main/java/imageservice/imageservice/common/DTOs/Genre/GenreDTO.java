package imageservice.imageservice.common.DTOs.Genre;


import imageservice.imageservice.common.DTOs.Artwork.IdentityArtworkDTO;
import imageservice.imageservice.infra.enitites.Artwork;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GenreDTO extends IdentityGenreDTO{
    private Set<IdentityArtworkDTO> artworks;
}
