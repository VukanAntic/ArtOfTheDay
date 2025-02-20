package imageservice.imageservice.common.services;

import imageservice.imageservice.common.DTOs.Genre.GenreDTO;
import imageservice.imageservice.common.DTOs.Genre.IdentityGenreDTO;
import imageservice.imageservice.infra.repositories.GenreRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class GenreService {

    private final GenreRepository genreRepository;
    private final ModelMapper modelMapper;

    public List<IdentityGenreDTO> getAllGenres() {
        return genreRepository.findAll()
                .stream().map(genre -> modelMapper.map(genre, IdentityGenreDTO.class))
                .collect(Collectors.toList());
    }

    public List<IdentityGenreDTO> getAllGenresFromIds(List<String> genreIds) {
        return genreRepository.findAllById(genreIds)
                .stream().map(genre -> modelMapper.map(genre, IdentityGenreDTO.class))
                .collect(Collectors.toList());
    }
}
