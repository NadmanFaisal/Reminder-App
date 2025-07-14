package com.example.NotificationService.dto;

import java.util.Date;

/**
 * Data Transfer Object (DTO) used for creating, updating, or deleting notifications.
 * Carries notification-related data from the client to the NotificationService.
 *
 * @param notificationId Unique ID of the notification (optional for creation)
 * @param reminderId ID of the associated reminder
 * @param status Status of the notification (e.g., scheduled, sent, failed)
 * @param type Type of notification (e.g., push, email)
 * @param userEmail Email of the user the notification belongs to
 * @param title Title of the notification
 * @param description Body/content of the notification
 * @param deleted Boolean flag indicating whether the notification is soft-deleted
 * @param notifyTime Scheduled time when the notification should be triggered
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