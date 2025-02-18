package imageservice.imageservice.common.services;

import imageservice.imageservice.common.DTOs.Artwork.ArtworkDTO;
import imageservice.imageservice.infra.enitites.Artwork;
import imageservice.imageservice.infra.repositories.ArtworkRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageService {

    private final ArtworkRepository imageRepository;
    private final ModelMapper modelMapper;

    public ImageService(ArtworkRepository imageRepository, ModelMapper modelMapper) {
        this.imageRepository = imageRepository;
        this.modelMapper = modelMapper;
    }

    public List<ArtworkDTO> getAllImages() {
        return imageRepository.findAll()
                .stream().map(artwork -> modelMapper.map(artwork, ArtworkDTO.class))
                .collect(Collectors.toList());
    }

    public List<ArtworkDTO> getAllImagesOfGenre(String genreId) {
        return imageRepository.findByGenres_Id(genreId)
                .stream().map(artwork -> modelMapper.map(artwork, ArtworkDTO.class))
                .collect(Collectors.toList());
    }


}


