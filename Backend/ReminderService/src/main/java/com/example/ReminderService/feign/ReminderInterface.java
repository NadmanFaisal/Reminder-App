package com.example.ReminderService.feign;

import org.springframework.cloud.netflix.feign.FeignClient;

@FeignClient("NOTIFICATIONSERVICE")
public class ReminderInterface {
    
}
