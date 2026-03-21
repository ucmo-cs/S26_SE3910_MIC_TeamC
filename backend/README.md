# Backend (Spring Boot) — appointment-service

Quick notes to run the backend locally during development:

- Requirements: Java 17+, Maven (or use the wrapper), Docker if running DB in a container.
- To run (with a configured datasource):

```bash
# from repository root
cd backend
mvn spring-boot:run
```

- For quick iteration you can use H2 or an in-memory datasource during early development.
- Configure `src/main/resources/application.properties` to point to your local database.

Next steps: add controller, service, and repository packages under `com.example.appointment`.
