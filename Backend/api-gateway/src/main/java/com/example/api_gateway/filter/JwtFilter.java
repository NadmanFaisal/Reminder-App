/*
 * This class defines the functions related to JWT tokens 
 * Authentication. It checks for the presents of JWT tokens 
 * and its validity.
 */

package com.example.api_gateway.filter;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.function.HandlerFilterFunction;
import org.springframework.web.servlet.function.HandlerFunction;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import com.example.api_gateway.util.JwtUtil;

@Component  // Registers this class as a spring-managed component
public class JwtFilter implements HandlerFilterFunction<ServerResponse, ServerResponse> {

    // jwtUtil object which defines functions for jwt related stuff
    private final JwtUtil jwtUtil;

    // Constructor injection of JwtUtil dependency for token validation
    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    /*
     * Filters the incoming HTTP requests for authorization headers. 
     * If the token is valid, the request proceeds to the next handler. 
     * Else, a 401 status response is sent back.
     */
    @Override
    public ServerResponse filter(ServerRequest request, HandlerFunction<ServerResponse> next) throws Exception {
        String authHeader = request.headers().firstHeader("Authorization");

        // Checks for the bearer
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ServerResponse.status(401).body("Missing or invalid Authorization header");
        }

        // Extract the JWT token by removing the "Bearer " prefix
        String token = authHeader.substring(7);

        // Validate the token using JwtUtil; reject if invalid or expired
        if (!jwtUtil.validateJwtToken(token)) {
            return ServerResponse.status(401).body("Invalid or expired token");
        }

        // if valid, proceeds with request handling
        return next.handle(request);
    }
}
