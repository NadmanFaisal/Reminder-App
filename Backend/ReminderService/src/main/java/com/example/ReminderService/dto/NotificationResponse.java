package com.example.ReminderService.dto;

import java.util.Date;

public record NotificationResponse(
    String notificationId, 
    String status, 
    String type, 
    String userEmail, 
    String title, 
    String description, 
    Date notifyTime
    ) {
}