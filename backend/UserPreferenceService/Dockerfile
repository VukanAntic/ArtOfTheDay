FROM eclipse-temurin:21-jdk-ubi9-minimal AS build

WORKDIR /app

# Install common module into local Maven repo
COPY common/.mvn/ common/.mvn/
COPY common/mvnw common/pom.xml common/
COPY common/src/ common/src/
RUN chmod +x common/mvnw && cd common && ./mvnw install -DskipTests

# Cache service dependencies
COPY UserPreferenceService/.mvn/ .mvn/
COPY UserPreferenceService/mvnw UserPreferenceService/pom.xml ./
RUN chmod +x ./mvnw && ./mvnw dependency:go-offline

# Build service
COPY UserPreferenceService/src/ src/
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:21-jre-ubi9-minimal
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
