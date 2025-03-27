FROM eclipse-temurin:21-jdk-ubi9-minimal

WORKDIR /app

COPY IdentityService/.mvn/ .mvn
COPY IdentityService/mvnw IdentityService/pom.xml ./
RUN ./mvnw dependency:go-offline

COPY IdentityService/src ./src

CMD ["./mvnw", "spring-boot:run"]