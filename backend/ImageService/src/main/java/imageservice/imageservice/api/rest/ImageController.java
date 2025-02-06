package imageservice.imageservice.api.rest;

import imageservice.imageservice.common.models.Artwork;
import imageservice.imageservice.common.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/images", produces = {
        "application/json",
        "application/x-protobuf"
})
public class ImageController {


    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/get-all")
    public List<Artwork> getMessage() {
        return imageService.getAllImages();
    }

}
