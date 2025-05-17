package com.example.ReminderService.dto;

import java.util.Date;

public record ReminderResponse(String reminderId, String title, String description, String userEmail, boolean completed, Date createdAt, Date lastModified, Date remindAt, boolean deleted) {
    
}
