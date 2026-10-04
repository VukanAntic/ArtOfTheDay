package imageservice.imageservice.infra.spring;

import imageservice.imageservice.common.DTOs.Artwork.ArtworkDTO;
import imageservice.imageservice.common.DTOs.Artwork.IdentityArtworkDTO;
import imageservice.imageservice.infra.enitites.Artwork;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

@Configuration
public class ImageBeanConfiguration {

    @Value("${artwork.images.base.url}")
    private String artworkImagesBaseUrl;

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();
        Converter<String, String> toPublicImageUrl = context -> publicImageUrl(context.getSource());

        mapper.emptyTypeMap(Artwork.class, ArtworkDTO.class)
                .addMappings(m -> m.using(toPublicImageUrl).map(Artwork::getImageUrl, ArtworkDTO::setImageUrl))
                .implicitMappings();
        mapper.emptyTypeMap(Artwork.class, IdentityArtworkDTO.class)
                .addMappings(m -> m.using(toPublicImageUrl).map(Artwork::getImageUrl, IdentityArtworkDTO::setImageUrl))
                .implicitMappings();

        return mapper;
    }

    private String publicImageUrl(String stored) {
        if (stored == null || stored.startsWith("http://") || stored.startsWith("https://")) {
            return stored;
        }
        return artworkImagesBaseUrl.replaceAll("/+$", "") + "/" + stored;
    }

    @Value("${jwt.secret}")
    private String secret;

    // TODO: [vukana] : Would not like this code to be copied everywhere, will check how to do this
    @Bean
    public JwtDecoder jwtDecoder() throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes(), mac.getAlgorithm());

        return NimbusJwtDecoder.withSecretKey(secretKey)
                .macAlgorithm(MacAlgorithm.HS256)
                .build();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));
        return http.build();
    }
}
