package com.spotify.dashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // backbone of the whole Spring Boot engine
public class BackendApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args); 
        // enables auto-configuration, scans for components, and sets up application context
    }
}