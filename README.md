# Reminder-App

## Introduction

The Reminder App is a simple, intuitive, and efficient mobile application designed to help users manage their daily tasks and important events without missing a beat! Whether it’s remembering to take medication, attend a meeting, or water your plants, this app ensures that nothing falls through the cracks. With an easy-to-use interface and customizable notifications, users can schedule, view, and manage reminders with ease — boosting productivity and reducing mental clutter.

## Application Features

- Secure user sign up, log in, and authentication
- Dashboard showing all incompleted reminders
- Easily add reminders using "+" button
- Modal view to provide crucial reminder details
- Update incompleted reminders from the dashboard
- Delete reminders by left-swipping on them
- Real-time notification update, even when the app is not in use
- See previous completed reminders by pressing the "see all" button
- Undo complete on a reminder

## Software Features

- Secure authentication with BCrypt hashing
- Microservices style architecture (Authentication service, reminder service, notification service, API Gatewat, Eureka server)
- Real-time reminders and notifications
- Easy configuration and env setup (env files found in the root directory)
- MongoDB integration separate for each service ensuring decoupleness
- Docker and docker compose support
- React native frontend
- Spring boot backend
- Lombok for boilerplate reduction and injection

## Setup Instructions

### MongoDB Setup

Create a MongoDB cluster and add the following env vars:

#### Linux/macOS
```
export MONGO_USERNAME=your_username
export MONGO_PASSWORD=your_password
```

#### Windows
```
$env:MONGO_USERNAME="your_username"
$env:MONGO_PASSWORD="your_password"
```

As such, you can connect your services to their respective mongoDB databases.

## Running Backend Services

Each service in the backend needs to be rebuilt by maven before it is containerized and run using docker. Below are the commands:

### Authentication Service

To package the AuthenticationService and run it using mvn, navigate to the AuthenticationService directory if you haven't and run the following command:
```
./mvnw clean package && java -jar target/AuthenticationService-0.0.1-SNAPSHOT.jar 
```

To containerize and run the service:
```
docker build -t reminder/authentication-service .
docker run -p 8082:8082 reminder/authentication-service
```

### API Gateway

To package the API Gateway and run it using mvn, navigate to the api-gateway directory if you haven't and run the following command:
```
./mvnw clean package && java -jar target/api-gateway-0.0.1-SNAPSHOT.jar 
```

To containerize and run the gateway:
```
docker build -t reminder/api-gateway-service .
docker run -p 8080:8080 reminder/api-gateway-service
```

### Eureka Server

To package the Eureka Server and run it using mvn, navigate to the eureka-server directory if you haven't and run the following command:
```
./mvnw clean package && java -jar target/eureka-server-0.0.1-SNAPSHOT.jar 
```

To containerize and run the server:

```
docker build -t reminder/eureka-server .
docker run -p 8761:8761 reminder/eureka-server
```

### Notification Service

To package the Notification Service and run it using mvn, navigate to the NotificationService directory if you haven't and run the following command:
```
./mvnw clean package && java -jar target/NotificationService-0.0.1-SNAPSHOT.jar 
```

To containerize and run the service:
```
docker build -t reminder/notification-service .
docker run -p 8084:8084 reminder/notification-service
```

### Reminder Service

To package the Reminder Service and run it using mvn, navigate to the Reminder Service directory if you haven't and run the following command:
```
./mvnw clean package && java -jar target/ReminderService-0.0.1-SNAPSHOT.jar
``` 

To containerize and run the service:
```
docker build -t reminder/reminder-service .
docker run -p 8085:8085 reminder/reminder-service
```

### Docker Compose

Before using docker compose, if a service has been updated, you need to go to the specific directory and rebuild it using maven commands, and then run the docker compose. 

For example, if authentication service has been updated:
```
cd AuthenticationService
mvn clean package
```

And then change directory to the root (where the compose file is located) and build the docker compose file with the needed env vars using the .env file:


```
export $(grep -v '^#' .env | xargs)
docker compose --env-file .env up --build
```

To stop docker compose:
```
docker compose down
```

## Running Frontend

To run the frontend locally, simple navigate to `frontend` from the root directory and ensure all the dependencies are installed:
```
npm install
```

Then run the following command to start the frontend:
```
npx expo start
```
## Frontend Docker

The frontend can also be containerized using Dockers. To build an image of the frontend, change directory to the `frontend` and run the following command to build and then run it:
```
docker build -t react_native_app ./Frontend
docker run -it --rm \
  -p 19006:19006 \
  -p 19001:19001 \
  -p 19002:19002 \
  -p 8081:8081 \
  carbonatedwaterr/reminder-app-frontend
```