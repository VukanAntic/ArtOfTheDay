package imageservice.imageservice.common.services;

import imageservice.imageservice.infra.enitites.Artwork;
import imageservice.imageservice.infra.repositories.ArtworkRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {

    private final ArtworkRepository imageRepository;

    public ImageService(ArtworkRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public List<Artwork> getAllImages() {
        return imageRepository.findByGenres_Name("Impressionism");
    }

}


