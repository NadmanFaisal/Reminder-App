package com.example.AuthenticationService.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.AuthenticationService.JwtUtil;
import com.example.AuthenticationService.dto.SignInResponse;
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

    public List<UserResponse> getAllusers() {
        return userRepository.findAll()
            .stream()
            .map(user -> new UserResponse(user.getEmail(), user.getUsername()))
            .toList();
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findById(email.toLowerCase());
    }
}
