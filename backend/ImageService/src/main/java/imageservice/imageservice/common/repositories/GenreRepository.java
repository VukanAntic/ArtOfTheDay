package imageservice.imageservice.common.repositories;

import imageservice.imageservice.common.enitites.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GenreRepository extends JpaRepository<Genre, String> {
    Optional<Genre> findByName(String name);
}
