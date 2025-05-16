package com.example.ReminderService.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.ReminderService.dto.ReminderRequest;
import com.example.ReminderService.dto.ReminderResponse;
import com.example.ReminderService.model.Reminder;
import com.example.ReminderService.repository.ReminderRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReminderService {
    private final ReminderRepository reminderRepository;

    public ReminderResponse createReminder(ReminderRequest reminderRequest) {
        Reminder reminder = Reminder.builder()
            .description(reminderRequest.description())
            .title(reminderRequest.title())
            .userEmail(reminderRequest.userEmail())
            .completed(reminderRequest.completed())
            .createdAt(reminderRequest.createdAt())
            .lastModified(reminderRequest.lastModified())
            .remindAt(reminderRequest.remindAt())
            .deleted(reminderRequest.deleted())
            .build();
        reminderRepository.save(reminder);
        log.info("Reminder created successfully!");
        return new ReminderResponse(
            reminder.getReminderId(), 
            reminder.getTitle(),
            reminder.getDescription(),
            reminder.getUserEmail(), 
            reminder.isCompleted(), 
            reminder.getCreatedAt(), 
            reminder.getLastModified(), 
            reminder.getRemindAt(),
            reminder.isDeleted()
        );
    }

    public List<ReminderResponse> getAllReminders() {
        return reminderRepository.findAll()
            .stream()
            .map(reminder -> new ReminderResponse(
                reminder.getReminderId(), 
                reminder.getTitle(),
                reminder.getDescription(), 
                reminder.getUserEmail(),
                reminder.isCompleted(), 
                reminder.getCreatedAt(), 
                reminder.getLastModified(), 
                reminder.getRemindAt(),
                reminder.isDeleted()
            ))
            .toList();
    }

    public List<ReminderResponse> getUserReminders(String userEmail) {
        return reminderRepository.findAllByUserEmail(userEmail)
            .stream()
            .map(reminder -> new ReminderResponse(
                reminder.getReminderId(), 
                reminder.getTitle(),
                reminder.getDescription(), 
                reminder.getUserEmail(),
                reminder.isCompleted(), 
                reminder.getCreatedAt(), 
                reminder.getLastModified(), 
                reminder.getRemindAt(),
                reminder.isDeleted()
            ))
            .toList();
    }

    
}
