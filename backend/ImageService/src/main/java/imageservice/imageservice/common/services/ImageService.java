package imageservice.imageservice.common.services;

import imageservice.imageservice.common.models.Artwork;
import imageservice.imageservice.common.repositories.ImageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {

    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public List<Artwork> getAllImages() {
        return imageRepository.findAll();
    }

}


