package com.example.ReminderService.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.ReminderService.dto.NotificationRequest;
import com.example.ReminderService.dto.ReminderRequest;
import com.example.ReminderService.dto.ReminderResponse;
import com.example.ReminderService.model.Reminder;
import com.example.ReminderService.repository.ReminderRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service class that handles business logic related to reminders.
 * Includes creation, updates, status toggling, and fetching operations.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ReminderService {
    private final ReminderRepository reminderRepository;

    /**
     * Helper method to convert a Reminder entity into a ReminderResponse DTO.
     */
    public ReminderResponse getFullReminderResponse(Reminder reminder) {
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

    /**
     * Creates a new reminder based on client request.
     */
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

    /**
     * Fetches all reminders stored in the database.
     */
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

    /**
     * Toggles the completed status of a reminder.
     */
    public ReminderResponse updateCompleteStatus(ReminderRequest reminderRequest) {
        Optional<Reminder> fetchedReminder = this.getReminderById(reminderRequest.reminderId());

        if (fetchedReminder.isEmpty()) {
            throw new RuntimeException("Reminder not found");
        }

        Reminder reminder = fetchedReminder.get();
        Boolean completed = reminder.isCompleted();
        reminder.setCompleted(!completed);
        reminder.setLastModified(new Date());
        reminderRepository.save(reminder);

        NotificationRequest notificationRequest = new NotificationRequest(
            null,
            reminderRequest.reminderId(),
            null,
            null,
            reminderRequest.userEmail(),
            reminderRequest.title(), 
            reminderRequest.description(), 
            reminderRequest.deleted(),
            reminderRequest.remindAt()
        );


        log.info("Reminder status changed successfully!");

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

    /**
     * Marks a reminder as deleted (soft delete).
     */
    public ReminderResponse updateDeleteStatus(ReminderRequest reminderRequest) {
        Optional<Reminder> fetchedReminder = this.getReminderById(reminderRequest.reminderId());

        if (fetchedReminder.isEmpty()) {
            throw new RuntimeException("Reminder not found");
        }

        Reminder reminder = fetchedReminder.get();
        reminder.setDeleted(true);
        reminder.setLastModified(new Date());
        reminderRepository.save(reminder);
        log.info("Reminder deleted status changed successfully!");

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

    /**
     * Updates fields of a reminder such as title, description, and remindAt.
     */
    public ReminderResponse updateReminder(ReminderRequest reminderRequest) {
        Optional<Reminder> fetchedReminder = this.getReminderById(reminderRequest.reminderId());

        if (fetchedReminder.isEmpty()) {
            throw new RuntimeException("Reminder not found");
        }

        Reminder reminder = fetchedReminder.get();
        if (reminderRequest.title() != null) {
            reminder.setTitle(reminderRequest.title());
        }
        if (reminderRequest.description() != null) {
            reminder.setDescription(reminderRequest.description());
        }
        if (reminderRequest.remindAt() != null) {
            reminder.setRemindAt(reminderRequest.remindAt());
        }
    
        reminder.setLastModified(new Date());
        reminderRepository.save(reminder);
        log.info("Successfully updated reminder!");

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

    /**
     * Retrieves all non-deleted reminders belonging to a specific user.
     */
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

    /**
     * Retrieves a specific reminder by its ID.
     */
    public ReminderResponse getReminder(String reminderId) {
        Optional <Reminder> fetchedReminder = getReminderById(reminderId);
        Reminder reminder = fetchedReminder.get();

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

    /**
     * Utility method to fetch a reminder by its ID from the database.
     */
    public Optional<Reminder> getReminderById(String reminderId) {
        return reminderRepository.findById(reminderId);
    }
    
}
