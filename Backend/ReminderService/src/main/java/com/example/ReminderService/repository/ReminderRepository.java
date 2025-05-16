package com.example.ReminderService.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.ReminderService.model.Reminder;

public interface ReminderRepository extends MongoRepository<Reminder, String> {
    
    List<Reminder> findAllByUserEmail(String userEmail);
}
