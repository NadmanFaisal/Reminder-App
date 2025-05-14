package com.example.ReminderService.dto;

import java.util.Date;

public record ReminderResponse(String reminder_id, String description, String status, Date createdAt, Date lastModified, boolean deleted) {
    
}
