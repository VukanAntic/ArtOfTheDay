package imageservice.imageservice.infra.enitites;


import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Artwork {

    @Id
    private Long id;
    private String title;
    @Column(length = 10000)
    private String description;
    @Column(name = "path_to_artwork")
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "artist_id")
    @Setter
    private Artist artist;

    @ManyToMany
    @JoinTable(
            name = "artwork_genre",
            joinColumns = @JoinColumn(name = "artwork_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres;


}
