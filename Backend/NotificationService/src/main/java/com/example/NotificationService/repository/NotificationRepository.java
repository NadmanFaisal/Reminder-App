package com.example.NotificationService.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.NotificationService.model.Notification;

public interface NotificationRepository extends MongoRepository<Notification, String> {
}
