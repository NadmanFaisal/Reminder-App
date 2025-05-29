package com.example.NotificationService.dto;

import java.util.Date;

public record NotificationResponse(String notificationId, String type, String title, String description, Date notify_time) {
}