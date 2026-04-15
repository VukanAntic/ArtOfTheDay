package backend.nextimageservice.common.service;

import common.common.config.CsvConfigLoader;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class SelectionProbabilityConfig {

    private double randomImageProbability;
    private double genreVsArtistProbability;

    @PostConstruct
    public void load() throws IOException {
        var config = CsvConfigLoader.load("selection-probabilities.csv");
        randomImageProbability = Double.parseDouble(config.get("random_image_probability"));
        genreVsArtistProbability = Double.parseDouble(config.get("genre_vs_artist_probability"));
    }

    public double getRandomImageProbability() {
        return randomImageProbability;
    }

    public double getGenreVsArtistProbability() {
        return genreVsArtistProbability;
    }
}
