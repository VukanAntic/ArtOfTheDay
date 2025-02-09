package imageservice.imageservice.common.enitites;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Artist {
    @Id
    private Long id;
    private String name;

    @OneToMany(mappedBy = "artist", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Artwork> artworks;


}
