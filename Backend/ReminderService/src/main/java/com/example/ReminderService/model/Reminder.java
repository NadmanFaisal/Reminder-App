package com.example.ReminderService.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a Reminder document stored in the MongoDB "Reminders" collection.
 * This entity captures all necessary details for managing a user's reminder.
 */
@Document(value = "Reminders")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Reminder {
    @Id
    private String reminderId;
    private String title;
    private String description;
    private String userEmail;
    private boolean completed;
    private boolean deleted;
    private Date createdAt;
    private Date lastModified;
    private Date remindAt;
}