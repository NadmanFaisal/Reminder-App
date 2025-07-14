/*
 * This class handles incoming HTTP requests related to user authentication.
 * It maps REST API endpoints to corresponding service-layer methods 
 * such as signup, login, token validation, and user retrieval.
 */

package com.example.AuthenticationService.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.AuthenticationService.dto.SignInResponse;
import com.example.AuthenticationService.dto.TokenRequest;
import com.example.AuthenticationService.dto.UserRequest;
import com.example.AuthenticationService.dto.UserResponse;
import com.example.AuthenticationService.exceptions.UserAlreadyExistsException;
import com.example.AuthenticationService.exceptions.UserDoesNotExistException;
import com.example.AuthenticationService.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController                             // Marks this class as a spring rest controller
@RequiredArgsConstructor                    // Generates constructor for final fields (userService)
@RequestMapping("/AuthenticationService")   // Base path for all HTTP endpoints related to authentication
public class UserController {

    private final UserService userService;
    
    /**
     * Handles user registration requests.
     * Throws UserAlreadyExistsException if the email is already registered.
     *
     * @param userRequest User registration data (email, username, password)
     * @return SignInResponse containing JWT token and user info
     */
    @PostMapping("/SignUp")
    @ResponseStatus(HttpStatus.CREATED)
    public SignInResponse createUser(@RequestBody UserRequest userRequest) {
        if(userService.getUserByEmail(userRequest.email()).isPresent()) {
            throw new UserAlreadyExistsException("User with the same email already exists.");
        }
        return userService.createUser(userRequest);
    }

    /**
     * Handles user JWT token validation
     * Returns a refreshed or validated token response if valid.
     *
     * @param tokenRequest - Contains the JWT token to be validated
     * @return SignInResponse with validated token or user info
     */
    @PostMapping("/ValidateMe")
    @ResponseStatus(HttpStatus.OK)
    public SignInResponse validateUser(@RequestBody TokenRequest tokenRequest) {
        return userService.validateUser(tokenRequest);
    }

    /**
     * Handles user login requests.
     * Throws UserDoesNotExistException if the email is not registered.
     *
     * @param userRequest - Login credentials (email, password)
     * @return SignInResponse containing JWT token and user info
     */
    @PostMapping("/LogIn")
    @ResponseStatus(HttpStatus.OK)
    public SignInResponse loginUser(@RequestBody UserRequest userRequest) {
        if(!userService.getUserByEmail(userRequest.email()).isPresent()) {
            throw new UserDoesNotExistException("User does not exist with this email.");
        }
        return userService.loginUser(userRequest);
    }

    /**
     * Retrieves all registered users.
     *
     * @return List of UserResponse objects containing user info
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponse> getAllusers() {
        return userService.getAllusers();
    }
}
