package com.quizapp.Quiz.App.Utilies;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    private String SECRET_KEY="TaK+HaV^uvCHEFsEVfypW#7g9^k*Z8$V";
    private SecretKey getSigninKey(){
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }
    public String generateToken(String username){
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    public String createToken(Map<String, Object> claims, String subject){
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .header()
                .empty()
                .add("typ","JWT")
                .and()
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() +1000 * 60* 60))
                .signWith(getSigninKey())
                .compact();
    }


    public String ExtractToken(String token){
        return extractAllClaims(token).getSubject();
    }
    public Claims extractAllClaims(String token){
        return Jwts.parser().verifyWith(getSigninKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    public String extractAllClaims(String token, String claims){
        return extractAllClaims(token).get(claims, String.class);
    }
    public Date extractExpiration(String token){
        return extractAllClaims(token).getExpiration();
    }
    public String extractUseremai(String token){
        Claims claims=extractAllClaims(token);
        return claims.getSubject();
    }

    public Boolean validateToken(String token){
        return !isTokenExpired(token);
    }
    public Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }
}
