package imageservice.imageservice.infra.repositories;

import imageservice.imageservice.infra.enitites.Artist;
import imageservice.imageservice.infra.enitites.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Long> {
}
