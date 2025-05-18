FROM eclipse-temurin:21-jdk-ubi9-minimal

WORKDIR /app

COPY ./.mvn/ .mvn
COPY ./mvnw ./pom.xml ./
RUN ./mvnw dependency:go-offline

COPY ./src ./src

CMD ["./mvnw", "spring-boot:run"]