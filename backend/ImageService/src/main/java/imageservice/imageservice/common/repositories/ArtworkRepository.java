package imageservice.imageservice.common.repositories;

import imageservice.imageservice.common.enitites.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ArtworkRepository extends JpaRepository<Artwork, Long> {
    List<Artwork> findByGenres_Name(String genreName);
}
