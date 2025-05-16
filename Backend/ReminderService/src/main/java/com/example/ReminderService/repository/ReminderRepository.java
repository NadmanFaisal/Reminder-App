package com.example.ReminderService.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.ReminderService.model.Reminder;

public interface ReminderRepository extends MongoRepository<Reminder, String> {
    @Query("{ 'userEmail': ?0, 'deleted': false }")
    List<Reminder> findAllByUserEmail(String userEmail);
}
