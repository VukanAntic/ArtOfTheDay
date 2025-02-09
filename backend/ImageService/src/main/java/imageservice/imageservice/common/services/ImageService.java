package imageservice.imageservice.common.services;

import imageservice.imageservice.common.enitites.Artwork;
import imageservice.imageservice.common.repositories.ArtworkRepository;
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


