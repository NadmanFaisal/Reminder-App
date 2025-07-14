package com.example.AuthenticationService.dto;

/**
 * Data Transfer Object (DTO) used for user registration and login requests.
 * Carries user credentials from the client to the authentication service.
 *
 * @param email User's email address
 * @param username Desired username (used during signup; may be ignored during login)
 * @param password User's password
 */
public record UserRequest(String email, String username, String password) {

}
