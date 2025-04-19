package identityservice.identityservice.infra.spring;


import identityservice.identityservice.common.DTOs.AuthenticationDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Component
public class JwtUtilComponent {

    @Value("${jwt.secret}")
    private String secret;
    private final long ACCESS_TOKEN_EXPIRATION = 15 * 60 * 1000L; // 15 min
    private final long REFRESH_TOKEN_EXPIRATION =  30 * 24 * 60 * 60 * 1000L; // 1 months

    public Optional<AuthenticationDTO> generateNewTokens(String username) {
        var accessToken = generateAccessToken(username);
        var refreshToken = generateRefreshToken(username);
        return Optional.of(new AuthenticationDTO(accessToken, refreshToken));
    }

    private String generateAccessToken(String username) {
        return Jwts.builder()
                .setClaims(getClaims(username))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private String generateRefreshToken(String username) {
        return Jwts.builder()
                .setClaims(getClaims(username))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Map<String, String> getClaims(String username) {
        return Map.of("username", username);
    }


    public boolean validateToken(String token, String username) {

        var extractUsername = extractUsername(token);
        if (!extractUsername.equals(username)) {
            return false;
        }

        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey()) // Ensure this method returns a valid Key
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            // Ensure the token is not expired
            return !claims.getExpiration().before(new Date());

        } catch (JwtException | IllegalArgumentException e) {
            return false; // Invalid token
        }
    }

    public String extractUsername(String token) {
        return extractClaims(token)
                .get("username", String.class);
    }


    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
}
