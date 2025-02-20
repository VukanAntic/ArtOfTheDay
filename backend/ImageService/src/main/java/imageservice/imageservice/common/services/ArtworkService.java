package imageservice.imageservice.common.services;

import imageservice.imageservice.common.DTOs.Artwork.ArtworkDTO;
import imageservice.imageservice.common.DTOs.Artwork.IdentityArtworkDTO;
import imageservice.imageservice.infra.repositories.ArtworkRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArtworkService {

    private final ArtworkRepository artworkRepository;
    private final ModelMapper modelMapper;

    public ArtworkService(ArtworkRepository artworkRepository, ModelMapper modelMapper) {
        this.artworkRepository = artworkRepository;
        this.modelMapper = modelMapper;
    }

    public List<ArtworkDTO> getAllArtworks() {
        return artworkRepository.findAll()
                .stream().map(artwork -> modelMapper.map(artwork, ArtworkDTO.class))
                .collect(Collectors.toList());
    }

    public List<IdentityArtworkDTO> getAllArtworks(String genreId) {
        return artworkRepository.findByGenres_Id(genreId)
                .stream().map(artwork -> modelMapper.map(artwork, IdentityArtworkDTO.class))
                .collect(Collectors.toList());
    }


    public List<ArtworkDTO> getAllArtworksFromIds(List<Long> artworkIds) {
        return artworkRepository.findAllById(artworkIds)
                .stream()
                .map(artwork -> modelMapper.map(artwork, ArtworkDTO.class))
                .collect(Collectors.toList());
    }
}


