package com.example.ReminderService.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

}
