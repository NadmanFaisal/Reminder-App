/**
 * Service class that handles business logic for user authentication,
 * including signup, login, token validation, and user retrieval.
 */

package com.example.AuthenticationService.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.AuthenticationService.JwtUtil;
import com.example.AuthenticationService.dto.SignInResponse;
import com.example.AuthenticationService.dto.TokenRequest;
import com.example.AuthenticationService.dto.UserRequest;
import com.example.AuthenticationService.dto.UserResponse;
import com.example.AuthenticationService.model.User;
import com.example.AuthenticationService.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
    private final JwtUtil jwtUtil;

    /**
     * Registers a new user by encrypting the password and saving to the database.
     * Generates a JWT token upon successful signup.
     *
     * @param userRequest User registration details
     * @return SignInResponse containing email, username, and JWT token
     */
    public SignInResponse createUser(UserRequest userRequest) {
        String encryptedPassword = encoder.encode(userRequest.password());
        User user = User.builder()
            .email(userRequest.email().toLowerCase())
            .username(userRequest.username())
            .password(encryptedPassword)
            .build();
        userRepository.save(user);
        String jwtToken = jwtUtil.generateToken(user.getEmail());
        log.info("User created successfully!");
        return new SignInResponse(user.getEmail(), user.getUsername(), jwtToken);
    }

    /**
     * Validates a JWT token and returns user details if the token is valid.
     *
     * @param tokenRequest Contains the JWT token to be validated
     * @return SignInResponse with user information and the same token
     */
    public SignInResponse validateUser(TokenRequest tokenRequest) {
        boolean valid = jwtUtil.validateJwtToken(tokenRequest.token());
        if(!valid) {
            throw new RuntimeException("Token is not valid.");
        }
        String email = jwtUtil.getEmailFromToken(tokenRequest.token());
        Optional<User> fetchedUser = getUserByEmail(email);

        if (fetchedUser.isEmpty()) {
            throw new RuntimeException("User not found for email: " + email);
        }

        User user = fetchedUser.get();
        log.info("User validated successfully.");
        return new SignInResponse(user.getEmail(), user.getUsername(), tokenRequest.token());
    }

    /**
     * Logs in a user by checking email existence and matching the password.
     * If successful, generates a new JWT token.
     *
     * @param userRequest Login credentials
     * @return SignInResponse with user info and token
     */
    public SignInResponse loginUser(UserRequest userRequest) {
        Optional<User> fetchedUser = userRepository.findById(userRequest.email().toLowerCase());

        if(fetchedUser.isEmpty()) {
            throw new RuntimeException("User not found.");
        }

        User user = fetchedUser.get();

        if(!encoder.matches(userRequest.password(), user.getPassword())) {
            throw new RuntimeException("Incorrect password.");
        }

        String jwtToken = jwtUtil.generateToken(user.getEmail());
        log.info("User logged in successfully!");
        return new SignInResponse(user.getEmail(), user.getUsername(), jwtToken);
    }

    /**
     * Retrieves a list of all registered users as simplified UserResponse objects.
     *
     * @return List of UserResponse DTOs
     */
    public List<UserResponse> getAllusers() {
        return userRepository.findAll()
            .stream()
            .map(user -> new UserResponse(user.getEmail(), user.getUsername()))
            .toList();
    }

    /**
     * Finds a user by email (case-insensitive).
     *
     * @param email User email to search for
     * @return Optional containing the User if found
     */
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findById(email.toLowerCase());
    }
}
