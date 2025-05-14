package com.example.ReminderService.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.ReminderService.model.Reminder;

public interface ReminderRepository extends MongoRepository<Reminder, String> {
    
}
