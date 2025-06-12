package com.example.ReminderService.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.example.ReminderService.feign.ReminderInterface;
import com.example.ReminderService.service.ReminderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ReminderService")
public class ReminderController {

    private final ReminderService reminderService;

    @Autowired
    private final ReminderInterface reminderInterface;

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

        reminderInterface.createNotification(notificationRequest);
        return reminderResponse;
    }

    @GetMapping("/GetUserReminders")
    @ResponseStatus(HttpStatus.OK)
    public List<ReminderResponse> getUserReminders(@RequestParam String userEmail) {
        return reminderService.getUserReminders(userEmail);
    }

    @GetMapping("/GetReminder")
    @ResponseStatus(HttpStatus.OK)
    public ReminderResponse getReminder(@RequestParam String reminderId) {
        return reminderService.getReminder(reminderId);
    }

    @PatchMapping("/UpdateCompleteStatus")
    @ResponseStatus(HttpStatus.OK)
    public ReminderResponse updateCompleteStatus(@RequestBody ReminderRequest reminderRequest) {
        return reminderService.updateCompleteStatus(reminderRequest);
    }
    
    @PatchMapping("/ChangeReminderDeleteStatus")
    @ResponseStatus(HttpStatus.OK)
    public ReminderResponse updateDeleteStatus(@RequestBody ReminderRequest reminderRequest) {
        return reminderService.updateDeleteStatus(reminderRequest);
    }

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

        reminderInterface.updateNotification(notificationRequest);
        return reminderService.updateReminder(reminderRequest);
    }


}
