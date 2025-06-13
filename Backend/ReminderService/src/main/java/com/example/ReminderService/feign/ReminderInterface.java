package com.example.ReminderService.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.example.ReminderService.dto.NotificationRequest;
import com.example.ReminderService.dto.NotificationResponse;

@FeignClient("NotificationService")
public interface ReminderInterface {
    @PostMapping("/NotificationService/CreateNotification")
    @ResponseStatus(HttpStatus.CREATED)
    public NotificationResponse createNotification(@RequestBody NotificationRequest notificationRequest);

    @PutMapping("/NotificationService/UpdateNotification")
    @ResponseStatus(HttpStatus.OK)
    public void updateNotification(@RequestBody NotificationRequest notificationRequest);

    @PutMapping("/NotificationService/DeleteNotificationByReminderId")
    @ResponseStatus(HttpStatus.OK)
    public NotificationResponse deleteNotificationByReminderId(@RequestParam String reminderId, @RequestParam("deletedStatus") boolean deletedStatus);
}
