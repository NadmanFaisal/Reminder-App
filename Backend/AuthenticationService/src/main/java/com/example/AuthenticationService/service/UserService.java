package com.example.AuthenticationService.service;

import java.util.List;

import org.springframework.stereotype.Service;

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

    public UserResponse createUser(UserRequest userRequest) {
        User user = User.builder()
            .email(userRequest.email())
            .username(userRequest.username())
            .password(userRequest.password())
            .build();
        userRepository.save(user);
        log.info("User created succesfully!");
        return new UserResponse(user.getEmail(), user.getUsername(), user.getPassword());
    }

    public List<UserResponse> getAllusers() {
        return userRepository.findAll()
            .stream()
            .map(user -> new UserResponse(user.getEmail(), user.getUsername(), user.getPassword()))
            .toList();
    }
}
