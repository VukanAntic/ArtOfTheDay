package imageservice.imageservice.common.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Image {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String description;
    // TODO : This could be a model for itself, so that we can display the info of the artist!
    private String artist;
    private String imageUrl;


    public Image() {}
    public Image(String title, String description, String artist, String imageUrl) {
        this.title = title;
        this.description = description;
        this.artist = artist;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
