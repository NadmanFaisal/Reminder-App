/*
 * This file configures CORS (Cross-Origin Resource Sharing) settings
 * to control which HTTP requests from the frontend are allowed by the backend.
 */

package com.example.api_gateway.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
 * The Configuration marks this class as a configuration for 
 * SpringBoot
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    /* Injects the allowed frontend origin from application properties
     * (fallback is '*')
     */
    @Value("${FRONTEND_ORIGIN:*}")
    private String frontendOrigin;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")              // Applies to all endpoints
                .allowedOrigins("*")             // Allows requests from all origins
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")     // Permitted HTTP methods
                .allowedHeaders("*")             // Allows any HTTP headers in the request
                .allowCredentials(false);  // Credentials (cookies, auth headers) are not allowed
    }
}
