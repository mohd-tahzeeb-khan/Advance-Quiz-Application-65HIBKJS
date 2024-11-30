package com.quizapp.Quiz.App.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class GlobalCorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); // Required for cookie-based auth or credentials
        config.setAllowedOrigins(Arrays.asList("http://localhost:4000")); // Specify allowed origin
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept", "X-Requested-With"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Explicitly specify methods
        config.setExposedHeaders(Arrays.asList("Authorization", "Content-Disposition")); // Headers exposed to the client
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
