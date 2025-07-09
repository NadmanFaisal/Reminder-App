package com.example.ReminderService.dto;

import java.util.Date;

/**
 * Data Transfer Object (DTO) used for creating, updating, or modifying reminders.
 * Carries reminder data from the client or other services to the ReminderService.
 *
 * @param reminderId Unique identifier of the reminder (null for creation)
 * @param title Title of the reminder
 * @param description Description or notes related to the reminder
 * @param userEmail Email of the user who owns the reminder
 * @param completed Flag indicating whether the reminder has been completed
 * @param createdAt Timestamp when the reminder was originally created
 * @param lastModified Timestamp of the last update to the reminder
 * @param remindAt Date and time the reminder is scheduled to trigger
 * @param deleted Flag indicating whether the reminder is marked as deleted (soft delete)
 */
public record ReminderRequest(
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
