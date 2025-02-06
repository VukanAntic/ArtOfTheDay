package imageservice.imageservice.common.repositories;

import imageservice.imageservice.common.models.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Artwork, Long> {
}
