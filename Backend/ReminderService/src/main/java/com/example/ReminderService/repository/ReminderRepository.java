package com.example.ReminderService.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.ReminderService.model.Reminder;

/**
 * Repository interface for performing CRUD operations on Reminder documents
 * in the MongoDB "Reminders" collection.
 */
public interface ReminderRepository extends MongoRepository<Reminder, String> {
    
    /**
     * Retrieves all non-deleted reminders associated with the given user's email.
     *
     * @param userEmail The email of the user
     * @return List of active (non-deleted) reminders
     */
    @Query("{ 'userEmail': ?0, 'deleted': false }")
    List<Reminder> findAllByUserEmail(String userEmail);
}
