package com.example.ReminderService.dto;

import java.util.Date;

public record ReminderResponse(String reminderId, String description, String userId, boolean completed, Date createdAt, Date lastModified, boolean deleted) {
    
}
