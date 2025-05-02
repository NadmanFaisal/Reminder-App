package com.example.ReminderService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ReminderServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReminderServiceApplication.class, args);
	}

}
