# Stage 1: Build - Usiamo l'immagine con Java 21 e Gradle per compilare
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY . .
# Rende eseguibile il gradlew (importante su Windows) e compila saltando i test per fare prima
RUN chmod +x gradlew
RUN ./gradlew build -x test

# Stage 2: Runtime - Usiamo solo il JRE (molto più leggero, solo per eseguire)
FROM eclipse-temurin:21-jre
WORKDIR /app
# Copiamo solo il file .jar generato dallo Stage 1
COPY --from=build /app/build/libs/*.jar app.jar
# Esponiamo la porta che abbiamo configurato in application.properties
EXPOSE 8081
# Comando di avvio
ENTRYPOINT ["java", "-jar", "app.jar"]