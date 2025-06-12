package com.example.NotificationService.dto;

import java.util.Date;

public record NotificationRequest(
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