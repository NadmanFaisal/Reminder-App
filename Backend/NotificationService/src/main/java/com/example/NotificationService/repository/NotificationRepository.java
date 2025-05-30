package com.example.NotificationService.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.NotificationService.model.Notification;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    @Query("{ 'userEmail': ?0 }")
    List<Notification> findNotificationsByEmail(String userEmail);
}
