package com.example.NotificationService.service;

import java.util.List;
import java.util.Optional;

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
            .reminderId(notificationRequest.reminderId())
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
            notification.getReminderId(),
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
                notification.getReminderId(),
                notification.getStatus(),
                notification.getType(),
                notification.getUserEmail(),
                notification.getTitle(),
                notification.getDescription(),
                notification.getNotifyTime()
            ))
            .toList();
    }

    public void updateNotification(NotificationRequest notificationRequest) {
        Optional<Notification> fetchedNotification = this.getNotificationByReminderId(notificationRequest.reminderId());

        if (fetchedNotification.isEmpty()) {
            throw new RuntimeException("Notification not found");
        }

        Notification notification = fetchedNotification.get();

        if (notificationRequest.status() != null) {
            notification.setStatus(notificationRequest.status());
        }
        if (notificationRequest.title() != null) {
            notification.setTitle(notificationRequest.title());
        }
        if (notificationRequest.type() != null) {
            notification.setType(notificationRequest.type());
        }
        if (notificationRequest.userEmail() != null) {
            notification.setUserEmail(notificationRequest.userEmail());
        }
        if (notificationRequest.description() != null) {
            notification.setDescription(notificationRequest.description());
        }
        if (notificationRequest.notifyTime() != null) {
            notification.setNotifyTime(notificationRequest.notifyTime());
        }

        notificationRepository.save(notification);
    }

    public Optional<Notification> getNotificationById(String notificationId) {
        return notificationRepository.findById(notificationId);
    }

    public Optional <Notification> getNotificationByReminderId(String reminderId) {
        return notificationRepository.findByReminderId(reminderId);
    }

    public NotificationResponse deleteNotificationByReminderId(String reminderId) {
        Optional <Notification> fetchedNotification = notificationRepository.findByReminderId(reminderId);
        
        if (fetchedNotification.isEmpty()) {
            throw new RuntimeException("Notification not found");
        }

        Notification notification = fetchedNotification.get();
        notificationRepository.deleteById(notification.getNotificationId());
        
        return new NotificationResponse(
            notification.getNotificationId(),
            notification.getReminderId(),
            notification.getStatus(),
            notification.getType(),
            notification.getUserEmail(),
            notification.getTitle(),
            notification.getDescription(),
            notification.getNotifyTime()
        );
    }
}
