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

import com.example.ReminderService.dto.ReminderRequest;
import com.example.ReminderService.dto.ReminderResponse;
import com.example.ReminderService.service.ReminderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ReminderService")
public class ReminderController {

    private final ReminderService reminderService;

    @PostMapping("/CreateReminder")
    @ResponseStatus(HttpStatus.CREATED)
    public ReminderResponse createUser(@RequestBody ReminderRequest reminderRequest) {
        return reminderService.createReminder(reminderRequest);
    }

    @GetMapping("/GetUserReminders")
    @ResponseStatus(HttpStatus.OK)
    public List<ReminderResponse> getUserReminders(@RequestParam String userEmail) {
        return reminderService.getUserReminders(userEmail);
    }

    @PatchMapping("/UpdateCompleteStatus")
    @ResponseStatus(HttpStatus.OK)
    public void updateCompleteStatus(@RequestBody ReminderRequest reminderRequest) {
        reminderService.updateCompleteStatus(reminderRequest);
    }

}
