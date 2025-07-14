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

/**
 * Service layer for handling business logic related to notifications.
 * This includes creation, retrieval, updates, and soft deletion of notifications.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {
    private final NotificationRepository notificationRepository;

    /**
     * Creates a new notification and saves it to the database.
     *
     * @param notificationRequest Request payload with notification details
     * @return NotificationResponse - The saved notification as a response object
     */
    public NotificationResponse createNotification(NotificationRequest notificationRequest) {
        Notification notification = Notification.builder()
            .reminderId(notificationRequest.reminderId())
            .status(notificationRequest.status())
            .type(notificationRequest.type())
            .userEmail(notificationRequest.userEmail())
            .title(notificationRequest.title())
            .description(notificationRequest.description())
            .deleted(notificationRequest.deleted())
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
            notification.getDeleted(),
            notification.getNotifyTime()
        );
    }

    /**
     * Retrieves all non-deleted notifications for a given user.
     *
     * @param email User's email
     * @return List of NotificationResponse objects
     */
    public List<NotificationResponse> getAllUserNotifications(String email) {
        return notificationRepository.findAllByUserEmail(email)
            .stream()
            .map(notification -> new NotificationResponse(
                notification.getNotificationId(), 
                notification.getReminderId(),
                notification.getStatus(),
                notification.getType(),
                notification.getUserEmail(),
                notification.getTitle(),
                notification.getDescription(),
                notification.getDeleted(),
                notification.getNotifyTime()
            ))
            .toList();
    }

    /**
     * Updates an existing notification's properties based on the provided data.
     *
     * @param notificationRequest The updated notification details
     */
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

    /**
     * Retrieves a notification by its unique ID.
     *
     * @param notificationId The notification's ID
     * @return Optional containing the notification if found
     */
    public Optional<Notification> getNotificationById(String notificationId) {
        return notificationRepository.findById(notificationId);
    }

    /**
     * Retrieves a notification by its associated reminder ID.
     *
     * @param reminderId The reminder ID
     * @return Optional containing the notification if found
     */
    public Optional <Notification> getNotificationByReminderId(String reminderId) {
        return notificationRepository.findByReminderId(reminderId);
    }

    /**
     * Soft-deletes or restores a notification by toggling its `deleted` flag.
     *
     * @param notificationRequest Contains the reminder ID used to locate the notification
     * @return NotificationResponse representing the updated notification
     */
    public NotificationResponse deleteNotificationByReminderId(NotificationRequest notificationRequest) {
        Optional <Notification> fetchedNotification = this.getNotificationByReminderId(notificationRequest.reminderId());
        
        if (fetchedNotification.isEmpty()) {
            throw new RuntimeException("Notification not found");
        }

        Notification notification = fetchedNotification.get();
        boolean deletedStatus = notification.getDeleted();
        notification.setDeleted(!deletedStatus);
        notificationRepository.save(notification);
        log.info("Notification deleted updated.");
        
        return new NotificationResponse(
            notification.getNotificationId(),
            notification.getReminderId(),
            notification.getStatus(),
            notification.getType(),
            notification.getUserEmail(),
            notification.getTitle(),
            notification.getDescription(),
            notification.getDeleted(),
            notification.getNotifyTime()
        );
    }
}
