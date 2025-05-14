package com.example.ReminderService.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.ReminderService.dto.ReminderResponse;
import com.example.ReminderService.repository.ReminderRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReminderService {
    private final ReminderRepository reminderRepository;

    public List<ReminderResponse> getAllReminders() {
        return reminderRepository.findAll()
            .stream()
            .map(reminder -> new ReminderResponse(
                reminder.getReminder_id(), 
                reminder.getDescription(), 
                reminder.getStatus(), 
                reminder.getCreatedAt(), 
                reminder.getLastModified(), 
                reminder.isDeleted()
            ))
            .toList();
    }
}
