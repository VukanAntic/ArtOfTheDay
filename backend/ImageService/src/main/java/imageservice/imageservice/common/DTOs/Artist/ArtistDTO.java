package imageservice.imageservice.common.DTOs.Artist;

import imageservice.imageservice.common.DTOs.Artwork.IdentityArtworkDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArtistDTO extends IdentityArtistDTO {
    Set<IdentityArtworkDTO> artworks;
}
