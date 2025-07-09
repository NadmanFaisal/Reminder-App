package com.example.NotificationService.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a notification document stored in the MongoDB "Notifications" collection.
 * Contains metadata about scheduled notifications related to reminders.
 */
@Document(value = "Notifications") // Maps this class to the "Notifications" collection in MongoDB
@AllArgsConstructor                // Generates a constructor with all fields
@NoArgsConstructor                 // Generates a no-argument constructor
@Builder                           // Enables builder pattern for creating instances
@Data                              // Generates getters, setters, toString, equals, and hashCode
public class Notification {
    @Id
    private String notificationId;
    private String reminderId;
    private String status;
    private String title;
    private String type;
    private String userEmail;
    private String description;
    private Boolean deleted;
    private Date notifyTime;
}
