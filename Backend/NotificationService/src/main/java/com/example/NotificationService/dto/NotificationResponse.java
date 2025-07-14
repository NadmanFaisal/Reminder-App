package com.example.NotificationService.dto;

import java.util.Date;

/**
 * Data Transfer Object (DTO) representing the response sent to the client
 * after performing operations on a notification (e.g., creation, update, retrieval).
 *
 * @param notificationId Unique identifier for the notification
 * @param reminderId ID of the reminder associated with this notification
 * @param status Current status of the notification (e.g., scheduled, sent)
 * @param type Type of notification (e.g., push, email)
 * @param userEmail Email of the user the notification belongs to
 * @param title Title of the notification
 * @param description Content/body of the notification
 * @param deleted Indicates if the notification is marked as deleted (soft delete)
 * @param notifyTime The scheduled time when the notification is set to trigger
 */

public record NotificationResponse(
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