package com.example.ReminderService.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.ReminderService.dto.NotificationRequest;
import com.example.ReminderService.dto.ReminderRequest;
import com.example.ReminderService.dto.ReminderResponse;
import com.example.ReminderService.service.ReminderService;

import lombok.RequiredArgsConstructor;

/**
 * REST controller that handles all incoming HTTP requests related to reminders.
 * Supports operations like creation, update, retrieval, and soft deletion.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/ReminderService")
public class ReminderController {

    private final ReminderService reminderService;

    /**
     * Creates a new reminder and prepares a corresponding NotificationRequest.
     *
     * @param reminderRequest Reminder creation request payload
     * @return ReminderResponse containing created reminder details
     */
    @PostMapping("/CreateReminder")
    @ResponseStatus(HttpStatus.CREATED)
    public ReminderResponse createUser(@RequestBody ReminderRequest reminderRequest) {
        ReminderResponse reminderResponse = reminderService.createReminder(reminderRequest);
        
        NotificationRequest notificationRequest = new NotificationRequest(
            null,
            reminderResponse.reminderId(),
            null,
            null,
            reminderRequest.userEmail(),
            reminderRequest.title(), 
            reminderRequest.description(),
            false,
            reminderRequest.remindAt()
        );

        return reminderResponse;
    }

    /**
     * Retrieves all reminders for a specific user.
     *
     * @param userEmail Email of the user
     * @return List of ReminderResponse objects
     */
    @GetMapping("/GetUserReminders")
    @ResponseStatus(HttpStatus.OK)
    public List<ReminderResponse> getUserReminders(@RequestParam String userEmail) {
        return reminderService.getUserReminders(userEmail);
    }

    /**
     * Retrieves a specific reminder by its ID.
     *
     * @param reminderId Unique ID of the reminder
     * @return ReminderResponse object
     */
    @GetMapping("/GetReminder")
    @ResponseStatus(HttpStatus.OK)
    public ReminderResponse getReminder(@RequestParam String reminderId) {
        return reminderService.getReminder(reminderId);
    }

    /**
     * Updates the completion status of a reminder.
     *
     * @param reminderRequest Contains reminder ID and updated status
     * @return Updated ReminderResponse object
     */
    @PatchMapping("/UpdateCompleteStatus")
    @ResponseStatus(HttpStatus.OK)
    public ReminderResponse updateCompleteStatus(@RequestBody ReminderRequest reminderRequest) {
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

        return reminderService.updateCompleteStatus(reminderRequest);
    }
    
    /**
     * Toggles the deleted status of a reminder (soft delete).
     *
     * @param reminderRequest Contains reminder ID and new deletion status
     * @return Updated ReminderResponse object
     */
    @PatchMapping("/ChangeReminderDeleteStatus")
    @ResponseStatus(HttpStatus.OK)
    public ReminderResponse updateDeleteStatus(@RequestBody ReminderRequest reminderRequest) {
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

        return reminderService.updateDeleteStatus(reminderRequest);
    }

    /**
     * Updates the content of an existing reminder (title, description, time, etc.).
     *
     * @param reminderRequest - Request with updated fields
     * @return Updated ReminderResponse object
     */
    @PatchMapping("/UpdateReminder")
    @ResponseStatus(HttpStatus.OK)
    public ReminderResponse updateReminder(@RequestBody ReminderRequest reminderRequest) {
        
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

        return reminderService.updateReminder(reminderRequest);
    }


}
