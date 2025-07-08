package com.example.AuthenticationService.dto;

/**
 * Data Transfer Object (DTO) representing the response 
 * sent to the client after a successful sign-in or authentication.
 * 
 * @param email The authenticated user's email
 * @param username The authenticated user's username
 * @param token The JWT token issued to the user
 */
public record SignInResponse(String email, String username, String token) {

}
