package com.example.NotificationService.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.NotificationService.dto.NotificationRequest;
import com.example.NotificationService.dto.NotificationResponse;
import com.example.NotificationService.model.Notification;
import com.example.NotificationService.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public NotificationResponse createNotification(NotificationRequest notificationRequest) {
        Notification notification = Notification.builder()
            .status(notificationRequest.status())
            .type(notificationRequest.type())
            .userEmail(notificationRequest.userEmail())
            .title(notificationRequest.title())
            .description(notificationRequest.description())
            .notifyTime(notificationRequest.notifyTime())
            .build();
        notificationRepository.save(notification);
        log.info("Notification created successfully!");
        return new NotificationResponse(
            notification.getNotificationId(), 
            notification.getStatus(),
            notification.getType(),
            notification.getUserEmail(),
            notification.getTitle(),
            notification.getDescription(),
            notification.getNotifyTime()
        );
    }

    public List<NotificationResponse> getAllUserNotifications(String email) {
        return notificationRepository.findNotificationsByEmail(email)
            .stream()
            .map(notification -> new NotificationResponse(
                notification.getNotificationId(), 
                notification.getStatus(),
                notification.getType(),
                notification.getUserEmail(),
                notification.getTitle(),
                notification.getDescription(),
                notification.getNotifyTime()
            ))
            .toList();
    }
}
