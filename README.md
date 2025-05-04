# Reminder-App

To connect to the database, crete a MongoDB cluster and add the following env:

For linux:
export USERNAME=your_username
export PASSWORD=your_password

For windows:
$env:USERNAME="your_username"
$env:PASSWORD="your_password$"

To package the AuthenticationService and run it using mvn

./mvnw package && java -jar target/AuthenticationService-0.0.1-SNAPSHOT.jar 

To docker build:

docker build reminder/authentication-service .

To docker run:

docker run -p 8081:8081 reminder/authentication-service