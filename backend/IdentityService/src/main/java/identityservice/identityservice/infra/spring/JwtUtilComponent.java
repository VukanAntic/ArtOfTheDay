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
import java.util.Optional;

@Component
public class JwtUtilComponent {

    @Value("${jwt.secret}")
    private String secret;
    private final long ACCESS_TOKEN_EXPIRATION = 15 * 60 * 1000L; // 15 min
    private final long REFRESH_TOKEN_EXPIRATION =  30 * 24 * 60 * 60 * 1000L; // 1 months

    public Optional<AuthenticationDTO> generateNewTokens(String email) {
        var accessToken = generateAccessToken(email);
        var refreshToken = generateRefreshToken(email);
        return Optional.of(new AuthenticationDTO(accessToken, refreshToken));
    }

    private String generateAccessToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private String generateRefreshToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    public boolean validateToken(String token, String email) {

        var extractedEmail = extractEmail(token);
        if (!extractedEmail.equals(email)) {
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

    public String extractEmail(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
}
