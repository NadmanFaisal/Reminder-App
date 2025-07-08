package com.example.AuthenticationService.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.AuthenticationService.model.User;

/**
 * Repository interface for performing CRUD operations on the User 
 * collection in MongoDB.
 * 
 * The interface extends MongoRepository to inherit built-in methods like:
 * - save()
 * - findById()
 * - findAll()
 * - deleteById()
 * 
 * The second generic type (String) represents the type of the ID 
 * field (email in this case).
 */
public interface UserRepository extends MongoRepository<User, String> {
    
}
