package com.example.NotificationService.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(value = "Notifications")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
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
