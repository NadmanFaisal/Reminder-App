package com.example.AuthenticationService.exceptions;

/**
 * Exception thrown when a user tries to register with an email
 * that already exists in the system.
 */
public class UserAlreadyExistsException extends RuntimeException {

    /**
     * Constructs a new UserAlreadyExistsException with the specified detail message.
     *
     * @param message - the detail message explaining the cause of the exception
     */
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
