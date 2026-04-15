package backend.nextimageservice.infra.spring;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.OctetSequenceKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.time.Instant;

@Component
public class ServiceJwtComponent {

    @Value("${jwt.secret}")
    private String secret;

    public String generateServiceToken() {
        var secretKey = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
        var jwk = new OctetSequenceKey.Builder(secretKey.getEncoded())
                .algorithm(com.nimbusds.jose.JWSAlgorithm.HS256)
                .build();
        JwtEncoder encoder = new NimbusJwtEncoder(
                new ImmutableJWKSet<SecurityContext>(new JWKSet(jwk))
        );

        var claims = JwtClaimsSet.builder()
                .subject("next-image-service")
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(30))
                .build();

        return encoder.encode(JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(), claims))
                .getTokenValue();
    }
}
