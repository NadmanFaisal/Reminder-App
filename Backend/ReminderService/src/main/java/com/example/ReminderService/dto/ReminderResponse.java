package com.example.ReminderService.dto;

import java.util.Date;

/**
 * Data Transfer Object (DTO) used to send reminder details back to clients or services.
 * Typically returned after creating, updating, or retrieving reminders.
 *
 * @param reminderId   - Unique identifier of the reminder
 * @param title        - Title of the reminder
 * @param description  - Description or additional notes related to the reminder
 * @param userEmail    - Email of the user who owns the reminder
 * @param completed    - Flag indicating whether the reminder has been marked as completed
 * @param createdAt    - Timestamp when the reminder was created
 * @param lastModified - Timestamp of the most recent update to the reminder
 * @param remindAt     - Date and time when the reminder is scheduled to trigger
 * @param deleted      - Flag indicating whether the reminder has been soft-deleted
 */
public record ReminderResponse(
    String reminderId,
    String title,
    String description,
    String userEmail,
    boolean completed,
    Date createdAt,
    Date lastModified,
    Date remindAt,
    boolean deleted
) {
}
