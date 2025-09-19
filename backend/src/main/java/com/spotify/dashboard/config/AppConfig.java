package com.spotify.dashboard.config;

import org.springframework.context.annotation.Bean; 
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration // tells Spring Boot that this class contains configuration methods, 
// so it'll scan for the annotation when the app first starts
public class AppConfig {

    @Bean // With Bean you basically create something once, and it can be used multiple times
    // so in this case, we create RestTemplate once and can use it for all the Spotify API calls in the future
    // sort of like how there's one book from the library, and but many people can borrow it
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

// RestTemplate is Spring's HTTP client, so it makes API calls to other services
// basically handles the complex HTTP comms by converting the JSON from said API calls 
// and converts them to Java maps, then returns the data to our code