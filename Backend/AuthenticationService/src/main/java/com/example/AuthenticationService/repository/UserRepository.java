package com.example.AuthenticationService.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.AuthenticationService.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    
}
