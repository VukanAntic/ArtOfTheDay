package imageservice.imageservice.common.DTOs.Artwork;

import imageservice.imageservice.common.DTOs.Artist.BaseArtistDTO;
import imageservice.imageservice.infra.enitites.Artist;
import imageservice.imageservice.infra.enitites.Genre;
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
    private BaseArtistDTO artist;
    private Set<Genre> genres;
}
