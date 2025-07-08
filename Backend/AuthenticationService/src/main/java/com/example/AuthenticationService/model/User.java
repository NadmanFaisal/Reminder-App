/**
 * This class Represents a user document stored in the 
 * MongoDB "Users" collection. This model holds basic 
 * authentication and identity data.
 */

package com.example.AuthenticationService.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(value = "Users")  // Maps this class to the "Users" collection in the DB
@AllArgsConstructor         // Generates constructor with all fields
@NoArgsConstructor          // Generates no-args constructor
@Builder                    // Enables builder pattern for creating User instances
@Data                       // Generates getters, setters, toString, equals, and hashCode
public class User {
    @Id         // Unique identifier for the user
    private String email;       // The chosen user's email
    private String username;    // The chosen user's username
    private String password;    // The chosen user's password
}
