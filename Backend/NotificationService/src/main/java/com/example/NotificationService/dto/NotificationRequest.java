package com.example.NotificationService.dto;

import java.util.Date;

public record NotificationRequest(String notificationId, String status, String type, String title, String description, Date notifyTime) {
}