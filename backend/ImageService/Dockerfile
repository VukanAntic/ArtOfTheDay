FROM eclipse-temurin:21-jdk-ubi9-minimal

WORKDIR /app

COPY ImageService/.mvn/ .mvn
COPY ImageService/mvnw ImageService/pom.xml ./
RUN ./mvnw dependency:go-offline

COPY ImageService/src ./src

CMD ["./mvnw", "spring-boot:run"]