package identityservice.identityservice.infra.spring;


import identityservice.identityservice.common.DTOs.AuthenticationDTO;
import io.jsonwebtoken.*;
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

    public String extractUsername(String token) {
        try {
            return extractClaims(token)
                    .get("username", String.class);
        }
        catch (MalformedJwtException e) {
            System.out.println("Malformed jwt");
            return null;
        }
        catch (ExpiredJwtException e) {
            System.out.println("Expired jwt");
            return null;
        }
        catch (JwtException e) {
            System.out.println("Some jwt exception");
            return null;
        }
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
