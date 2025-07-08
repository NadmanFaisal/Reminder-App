package com.example.AuthenticationService.dto;

/**
 * Data Transfer Object (DTO) representing a request that contains a JWT token.
 * Typically used to validate the token on the server side.
 * 
 * @param token The JWT token to be validated
 */
public record TokenRequest(String token) {
    
}
