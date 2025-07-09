package com.example.NotificationService.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.NotificationService.model.Notification;

/**
 * Repository interface for performing CRUD operations on Notification documents
 * in the MongoDB "Notifications" collection. Also includes custom queries
 * for filtering by user email and reminder ID.
 */
public interface NotificationRepository extends MongoRepository<Notification, String> {

    /**
     * Retrieves all notifications associated with the given user email,
     * regardless of deletion status.
     *
     * @param userEmail The email of the user
     * @return List of Notification objects
     */
    @Query("{ 'userEmail': ?0 }")
    List<Notification> findNotificationsByEmail(String userEmail);
    
    /**
     * Retrieves all **non-deleted** notifications for the given user email.
     *
     * @param userEmail The email of the user
     * @return List of Notification objects with deleted = false
     */
    @Query("{ 'userEmail': ?0, 'deleted': false }")
    List<Notification> findAllByUserEmail(String userEmail);
    
    /**
     * Retrieves a notification by the associated reminder ID.
     *
     * @param reminderId The ID of the reminder
     * @return Optional containing the Notification if found
     */
    Optional<Notification> findByReminderId(String reminderId);
}
