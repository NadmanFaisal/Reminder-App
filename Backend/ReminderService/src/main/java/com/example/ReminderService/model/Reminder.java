package com.example.ReminderService.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(value = "Reminders")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Reminder {
    @Id
    private String reminder_id;
    private String description;
    private String status;
    private boolean deleted;
    private Date createdAt;
    private Date lastModified;
}