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


/**
 * REST controller that handles notification-related HTTP requests.
 * Supports creation, retrieval, update, and deletion of notifications.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/NotificationService")
public class NotificationController {
    private final NotificationService notificationService;

    /**
     * Creates a new notification based on the provided request data.
     *
     * @param notificationRequest Data required to create the notification
     * @return NotificationResponse containing created notification details
     */
    @PostMapping("/CreateNotification")
    @ResponseStatus(HttpStatus.CREATED)
    public NotificationResponse createNotification(@RequestBody NotificationRequest notificationRequest) {
        return notificationService.createNotification(notificationRequest);
    }

    /**
     * Retrieves all notifications associated with a specific user.
     *
     * @param userEmail The email of the user whose notifications are to be fetched
     * @return List of NotificationResponse objects for the user
     */
    @GetMapping("/GetUserNotifications")
    @ResponseStatus(HttpStatus.CREATED)
    public List<NotificationResponse> getUserNotifications(@RequestParam String userEmail) {
        return notificationService.getAllUserNotifications(userEmail);
    }

    /**
     * Updates an existing notification with the provided data.
     *
     * @param notificationRequest Updated notification details
     */
    @PutMapping("/UpdateNotification")
    @ResponseStatus(HttpStatus.OK)
    public void updateNotification(@RequestBody NotificationRequest notificationRequest) {
        notificationService.updateNotification(notificationRequest);
    }

    /**
     * Soft-deletes a notification by its associated reminder ID.
     *
     * @param notificationRequest Contains the reminder ID to delete notification for
     * @return NotificationResponse of the deleted notification
     */
    @PutMapping("/DeleteNotificationByReminderId")
    @ResponseStatus(HttpStatus.OK)
    public NotificationResponse deleteNotificationByReminderId(@RequestBody NotificationRequest notificationRequest) {
        return notificationService.deleteNotificationByReminderId(notificationRequest);
    }
}
