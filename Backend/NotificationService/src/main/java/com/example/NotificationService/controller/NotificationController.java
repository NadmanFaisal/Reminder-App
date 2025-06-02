package com.example.NotificationService.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.NotificationService.dto.NotificationRequest;
import com.example.NotificationService.dto.NotificationResponse;
import com.example.NotificationService.service.NotificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/NotificationService")
public class NotificationController {
    private final NotificationService notificationService;

    @PostMapping("/CreateNotification")
    @ResponseStatus(HttpStatus.CREATED)
    public NotificationResponse createNotification(@RequestBody NotificationRequest notificationRequest) {
        return notificationService.createNotification(notificationRequest);
    }

    @GetMapping("/GetUserNotifications")
    @ResponseStatus(HttpStatus.CREATED)
    public List<NotificationResponse> getUserNotifications(@RequestParam String userEmail) {
        return notificationService.getAllUserNotifications(userEmail);
    }

    @PutMapping("/UpdateNotification")
    @ResponseStatus(HttpStatus.OK)
    public void updateNotification(@RequestBody NotificationRequest notificationRequest) {
        notificationService.updateNotification(notificationRequest);
    }

    @PutMapping("/DeleteNotificationByReminderId")
    @ResponseStatus(HttpStatus.OK)
    public NotificationResponse deleteNotificationByReminderId(@RequestParam String reminderId, @RequestParam boolean deletedStatus) {
        return notificationService.deleteNotificationByReminderId(reminderId, deletedStatus);
    }
}
