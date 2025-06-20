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

@Service
@RequiredArgsConstructor
@Slf4j
public class ReminderService {
    private final ReminderRepository reminderRepository;

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

    public Optional<Reminder> getReminderById(String reminderId) {
        return reminderRepository.findById(reminderId);
    }
    
}
