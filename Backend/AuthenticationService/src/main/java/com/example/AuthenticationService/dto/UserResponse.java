package com.example.AuthenticationService.dto;

/**
 * Data Transfer Object (DTO) used to return basic user information to the client.
 * Typically used in response payloads where sensitive data like passwords are excluded.
 *
 * @param email The user's email address
 * @param username The user's username
 */
public record UserResponse(String email, String username) {
}
