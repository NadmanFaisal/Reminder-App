package com.example.ReminderService.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.example.ReminderService.dto.NotificationRequest;
import com.example.ReminderService.dto.NotificationResponse;

@FeignClient(name = "NotificationService", url = "https://notification-service-181273673095.asia-south1.run.app")
public interface ReminderInterface {
    @PostMapping("/NotificationService/CreateNotification")
    @ResponseStatus(HttpStatus.CREATED)
    public NotificationResponse createNotification(@RequestBody NotificationRequest notificationRequest);

    @PutMapping("/NotificationService/UpdateNotification")
    @ResponseStatus(HttpStatus.OK)
    public void updateNotification(@RequestBody NotificationRequest notificationRequest);

    @PutMapping("/DeleteNotificationByReminderId")
    @ResponseStatus(HttpStatus.OK)
    public NotificationResponse deleteNotificationByReminderId(@RequestBody NotificationRequest notificationRequest);
}
