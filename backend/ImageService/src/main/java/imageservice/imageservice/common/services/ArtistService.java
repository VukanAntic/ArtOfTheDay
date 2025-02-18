package imageservice.imageservice.common.services;

import imageservice.imageservice.common.DTOs.Artwork.ArtworkDTO;
import imageservice.imageservice.infra.repositories.ArtistRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArtistService {

    private final ArtistRepository artistRepository;
    private final ModelMapper modelMapper;


    public ArtistService(ArtistRepository artistRepository, ModelMapper modelMapper) {
        this.artistRepository = artistRepository;
        this.modelMapper = modelMapper;
    }


    public List<ArtworkDTO> GetAllArtworksFromArtist(Long artistId) {
        var artist = artistRepository.findById(artistId);
        if (artist.isEmpty()) {return List.of();}

        return artist.get().getArtworks().stream().map(artwork -> modelMapper.map(artwork, ArtworkDTO.class)).toList();

    }
}
