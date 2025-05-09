# Reminder-App

To connect to the database, crete a MongoDB cluster and add the following env:

For linux:
export USERNAME=your_username
export PASSWORD=your_password

For windows:
$env:USERNAME="your_username"
$env:PASSWORD="your_password$"

To package the AuthenticationService and run it using mvn

./mvnw clean package && java -jar target/AuthenticationService-0.0.1-SNAPSHOT.jar 

To docker build:

docker build -t reminder/authentication-service .

To docker run:

docker run -p 8082:8082 reminder/authentication-service

To package the LoggingService and run it using mvn

./mvnw clean package && java -jar target/LoggingService-0.0.1-SNAPSHOT.jar 

To docker build:

docker build -t reminder/logging-service .

To docker run:

docker run -p 8083:8083 reminder/logging-service

To package the NotificationService and run it using mvn

./mvnw clean package && java -jar target/NotificationService-0.0.1-SNAPSHOT.jar 

To docker build:

docker build -t reminder/notification-service .

To docker run:

docker run -p 8084:8084 reminder/notification-service

To package the ReminderService and run it using mvn

./mvnw clean package && java -jar target/ReminderService-0.0.1-SNAPSHOT.jar 

To docker build:

docker build -t reminder/reminder-service .

To docker run:

docker run -p 8085:8085 reminder/reminder-service

To run the docker compose:

docker compose up

Features:
User data is encrypted using BCryptHashing
Lombok for data injection