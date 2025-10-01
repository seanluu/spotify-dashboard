package com.spotify.dashboard.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity; // well yeah that's the name duh
import org.springframework.security.web.SecurityFilterChain; // All requests have to go through this chain (and all the filters within it)
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean 
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception { 
        http // filters are below (within the security chain)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable()) // filter 1: disables csrf protection (Cross-Site Request Forgery)
            .authorizeHttpRequests(authz -> authz // filter 2: sets up auth rules for HTTP reqs and defines who can access what
                .requestMatchers("/api/**").permitAll() // allows API access without authentication required, like the tracks, artists, etc
                .anyRequest().authenticated() // requires authentication for all other endpoints (like /dashboard, /admin, etc)
            );
        return http.build(); // builds and returns the actual SecurityFilterChain config for the Spring Security to use
    }

    // CORS = Cross-Origin Resource Sharing
    // browser security feature that prevents websites from making reqs to diff domains

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:3000", "http://127.0.0.1:3000")); // allow backend reqs from both localhost and 127.0.0.1
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // allows these specific HTTP methods from our frontend
        // (i.e, "GET" for fetching data (songs), "POST" for creating data (playlists), "PUT" for updating data (user prefs), "DELETE" for removing tracks, "OPTIONS" for preflight reqs)
        configuration.setAllowedHeaders(Arrays.asList("*")); // allows all headers with *, so flexibile for diff types of reqs like Accept or Authorization
        configuration.setAllowCredentials(true); // allows cookies and auth headers to be sent w/ reqs, enabling secure auth between frontend and backend

        // Creates a CORS configuration source that can apply different CORS rules to different URL patterns
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(); 
        source.registerCorsConfiguration("/**", configuration); // require all the CORS rules we made earlier for all URLs
        return source;
    }
}