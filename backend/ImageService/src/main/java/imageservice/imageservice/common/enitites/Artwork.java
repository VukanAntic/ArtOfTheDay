package imageservice.imageservice.common.enitites;


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
    @Column(length = 20000)
    private String description;
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
