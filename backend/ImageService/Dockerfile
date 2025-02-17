FROM maven as build

WORKDIR /app/image-service

COPY . .

RUN mvn clean package

FROM openjdk:11-slim

WORKDIR ./app

COPY --from=build /app/image-service/target/ImageService*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]