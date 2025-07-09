package com.example.ReminderService.dto;

import java.util.Date;

/**
 * Data Transfer Object (DTO) used for sending notification-related data
 * from the ReminderService to the NotificationService.
 *
 * @param notificationId Unique identifier for the notification (nullable for creation)
 * @param reminderId ID of the associated reminder
 * @param status Current status of the notification (e.g., scheduled, sent)
 * @param type Type of notification (e.g., push, email)
 * @param userEmail Email address of the user who owns the notification
 * @param title Title of the notification
 * @param description Description or content of the notification
 * @param deleted Flag indicating if the notification is marked as deleted (soft delete)
 * @param notifyTime Date and time when the notification should be triggered
 */
public record NotificationRequest(
    String notificationId, 
    String reminderId,
    String status, 
    String type, 
    String userEmail, 
    String title, 
    String description, 
    Boolean deleted, 
    Date notifyTime
    ) {
}