package imageservice.imageservice.infra.repositories;

import imageservice.imageservice.infra.enitites.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;


public interface ArtworkRepository extends JpaRepository<Artwork, Long> {
    List<Artwork> findByGenres_Name(String genreName);
    List<Artwork> findByGenres_Id(String genreId);

    @Query(value = "SELECT id FROM artwork ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Optional<Long> findRandomId();

    @Query(value = "SELECT id FROM artwork WHERE id NOT IN :excludeIds ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Optional<Long> findRandomIdExcluding(@Param("excludeIds") Collection<Long> excludeIds);
}
