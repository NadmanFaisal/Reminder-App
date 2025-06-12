package com.example.NotificationService.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.NotificationService.model.Notification;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    @Query("{ 'userEmail': ?0 }")
    List<Notification> findNotificationsByEmail(String userEmail);
    
    @Query("{ 'userEmail': ?0, 'deleted': false }")
    List<Notification> findAllByUserEmail(String userEmail);
    
    Optional<Notification> findByReminderId(String reminderId);
}
