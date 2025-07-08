package com.example.AuthenticationService.exceptions;

/**
 * Exception thrown when an operation is attempted on a user 
 * that does not exist in the system (e.g., during login or lookup).
 */
public class UserDoesNotExistException extends RuntimeException {

    /**
     * Constructs a new UserDoesNotExistException with the specified detail message.
     *
     * @param message - the detail message explaining the cause of the exception
     */
    public UserDoesNotExistException(String message) {
        super(message);
    }
}
