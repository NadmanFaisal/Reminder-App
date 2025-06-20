# Reminder-App

To connect to the database, crete a MongoDB cluster and add the following env:

For linux:
export MONGO_USERNAME=your_username
export MONGO_PASSWORD=your_password

For windows:
$env:MONGO_USERNAME="your_username"
$env:MONGO_PASSWORD="your_password$"

To package the AuthenticationService and run it using mvn

./mvnw clean package && java -jar target/AuthenticationService-0.0.1-SNAPSHOT.jar 

To docker build:

docker build -t reminder/authentication-service .

To docker run:

docker run -p 8082:8082 reminder/authentication-service

To package the api-gateway and run it using mvn

./mvnw clean package && java -jar target/api-gateway-0.0.1-SNAPSHOT.jar 

To docker build:

docker build -t reminder/api-gateway-service .

To docker run:

docker run -p 8080:8080 reminder/api-gateway-service

To package the eureka-server and run it using mvn

./mvnw clean package && java -jar target/eureka-server-0.0.1-SNAPSHOT.jar 

To docker build:

docker build -t reminder/eureka-server .

To docker run:

docker run -p 8761:8761 reminder/eureka-server

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


To Start each service using the automated script:

cd Backend
chmod +x start-backend.sh
./start-backend.sh

To stop
in your terminal, write 


Features:
User data is encrypted using BCryptHashing
Lombok for data injection

================= DEV NOTES ==================

Whenver making something for reminder service, ensure if it is related to notification service. Make sure to  update notification service as well if required.

export $(grep -v '^#' .env | xargs)

docker compose --env-file .env up --build