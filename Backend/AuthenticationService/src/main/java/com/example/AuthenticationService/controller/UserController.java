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

@RestController
@RequiredArgsConstructor
@RequestMapping("/AuthenticationService")
public class UserController {

    private final UserService userService;
    
    @PostMapping("/SignUp")
    @ResponseStatus(HttpStatus.CREATED)
    public SignInResponse createUser(@RequestBody UserRequest userRequest) {
        if(userService.getUserByEmail(userRequest.email()).isPresent()) {
            throw new UserAlreadyExistsException("User with the same email already exists.");
        }
        return userService.createUser(userRequest);
    }

    @PostMapping("/ValidateMe")
    @ResponseStatus(HttpStatus.OK)
    public SignInResponse validateUser(@RequestBody TokenRequest tokenRequest) {
        return userService.validateUser(tokenRequest);
    }

    @PostMapping("/LogIn")
    @ResponseStatus(HttpStatus.OK)
    public SignInResponse loginUser(@RequestBody UserRequest userRequest) {
        if(!userService.getUserByEmail(userRequest.email()).isPresent()) {
            throw new UserDoesNotExistException("User does not exist with this email.");
        }
        return userService.loginUser(userRequest);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponse> getAllusers() {
        return userService.getAllusers();
    }
}
