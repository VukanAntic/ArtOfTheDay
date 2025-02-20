package imageservice.imageservice.common.services;

import imageservice.imageservice.common.DTOs.Artist.IdentityArtistDTO;
import imageservice.imageservice.common.DTOs.Artwork.ArtworkDTO;
import imageservice.imageservice.common.DTOs.Artwork.IdentityArtworkDTO;
import imageservice.imageservice.common.DTOs.Genre.IdentityGenreDTO;
import imageservice.imageservice.infra.repositories.ArtistRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ArtistService {

    private final ArtistRepository artistRepository;
    private final ModelMapper modelMapper;

    // TODO [vukana] : Might be better if this was in ArtworkService?
    public List<IdentityArtworkDTO> getAllArtworksFromArtist(Long artistId) {
        var artist = artistRepository.findById(artistId);
        if (artist.isEmpty()) {return List.of();}

        return artist.get().getArtworks().stream()
                .map(artwork -> modelMapper.map(artwork, IdentityArtworkDTO.class)).toList();

    }

    public List<IdentityArtistDTO> getAllArtists() {
        return artistRepository.findAll().stream().map(artist -> modelMapper.map(artist, IdentityArtistDTO.class))
                .collect(Collectors.toList());
    }

    public List<IdentityArtistDTO> getAllArtistsByIds(List<Long> ids) {
        return artistRepository.findAllById(ids).stream().map(artist -> modelMapper.map(artist, IdentityArtistDTO.class))
                .collect(Collectors.toList());
    }
}
