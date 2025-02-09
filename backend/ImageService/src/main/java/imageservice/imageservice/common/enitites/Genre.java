package imageservice.imageservice.common.enitites;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Genre {

    @Id
    private String id;
    private String name;

    @ManyToMany(mappedBy = "genres")
    private Set<Artwork> artworks;
}
