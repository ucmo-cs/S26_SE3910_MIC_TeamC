# Backend Structure & Documentation

## Overview

The appointment booking backend is a Spring Boot 3.2 application with Spring Data JPA, using H2 as an in-memory database. It follows a clean layered architecture: **Controller → Service → Repository → Entity**.

---

## Architecture

### Layered Design

```
Controller Layer
    ↓
Service Layer
    ↓
Repository Layer (Spring Data JPA)
    ↓
Entity Layer (JPA Entities)
    ↓
H2 Database
```

### Key Principles

- **DTOs** – Controllers accept/return DTOs, never expose entities directly
- **Constructor Injection** – All dependencies injected via constructor
- **Transactional Services** – Business logic wrapped in `@Transactional`
- **Exception Handling** – Service exceptions mapped to HTTP status codes in controllers
- **UUID Primary Keys** – All entities use `@UuidGenerator` for distributed ID generation

---

## Project Structure

```
backend/
├── src/main/java/com/example/appointment/
│   ├── AppointmentServiceApplication.java    # Spring Boot entry point
│   ├── config/
│   │   └── WebConfig.java                    # CORS and web config
│   ├── controller/
│   │   ├── AppointmentController.java        # POST appointments, GET available slots
│   │   ├── BranchController.java             # GET branches, GET topics by branch
│   │   └── UserController.java               # POST users
│   ├── model/
│   │   ├── User.java                         # User entity
│   │   ├── Branch.java                       # Branch entity
│   │   ├── Topic.java                        # Topic entity
│   │   ├── BranchTopic.java                  # Join table: Branch ↔ Topic
│   │   └── Appointment.java                  # Appointment entity (User, BranchTopic, time)
│   ├── dto/
│   │   ├── CreateUserRequest.java            # Request DTO for user creation
│   │   ├── CreateAppointmentRequest.java     # Request DTO for appointment booking
│   │   ├── AppointmentResponse.java          # Response DTO for bookings
│   │   ├── BranchResponse.java               # Response DTO for branches
│   │   └── TopicResponse.java                # Response DTO for topics
│   ├── repository/
│   │   ├── UserRepository.java               # JpaRepository for User
│   │   ├── BranchRepository.java             # JpaRepository for Branch
│   │   ├── TopicRepository.java              # JpaRepository for Topic
│   │   ├── BranchTopicRepository.java        # JpaRepository for BranchTopic
│   │   └── AppointmentRepository.java        # JpaRepository for Appointment + custom queries
│   ├── service/
│   │   ├── AppointmentService.java           # Service interface
│   │   ├── UserService.java                  # Service interface
│   │   ├── BranchService.java                # Service interface
│   │   └── TopicService.java                 # Service interface
│   ├── service/impl/
│   │   ├── AppointmentServiceImpl.java        # Booking logic, duplicate prevention
│   │   ├── UserServiceImpl.java               # User CRUD
│   │   ├── BranchServiceImpl.java             # Branch queries
│   │   └── TopicServiceImpl.java              # Topic queries
│   ├── exception/
│   │   └── TimeslotUnavailableException.java # Custom exception (legacy)
│   └── resources/
│       └── application.properties             # H2 config, JPA settings
└── pom.xml                                    # Maven dependencies
```

---

## Database Schema

### Entities & Relationships

```
User (1) ──────→ Appointment (Many)
                     ↓
                BranchTopic (Many-to-One)
                     ├→ Branch (1)
                     └→ Topic (1)
```

### Tables

| Table             | Columns                                         | Notes                    |
| ----------------- | ----------------------------------------------- | ------------------------ |
| **users**         | id (UUID), name, email                          | User accounts            |
| **branches**      | id (UUID), name                                 | Physical branches        |
| **topics**        | id (UUID), name                                 | Appointment topics       |
| **branch_topics** | id (UUID), branch_id, topic_id                  | Links branches to topics |
| **appointments**  | id (UUID), user_id, branch_topic_id, start_time | Bookings                 |

### Key Constraints

- **Appointments** – Unique constraint on `(branch_topic_id, start_time)` prevents double-booking
- **Users** – Unique constraint on `email`
- All foreign keys cascade on delete

---

## API Endpoints

### Users

**POST** `/api/users`

- Create a new user
- **Request:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

---

### Branches

**GET** `/api/branches`

- List all branches
- **Response:** `200 OK`
  ```json
  [
    {
      "id": "880e8400-e29b-41d4-a716-446655440003",
      "name": "New York"
    },
    {
      "id": "990e8400-e29b-41d4-a716-446655440004",
      "name": "San Francisco"
    }
  ]
  ```

**GET** `/api/branches/{branchId}/topics`

- Get all topics offered at a branch
- **Response:** `200 OK`
  ```json
  [
    {
      "id": "aa0e8400-e29b-41d4-a716-446655440005",
      "name": "Customer Support"
    },
    {
      "id": "bb0e8400-e29b-41d4-a716-446655440006",
      "name": "Technical Review"
    }
  ]
  ```

---

### Appointments

**POST** `/api/appointments`

- Book an appointment
- **Request:**
  ```json
  {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "branchTopicId": "660e8400-e29b-41d4-a716-446655440001",
    "startTime": "2026-02-20T10:00:00",
    "reason": "Quarterly review"
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "branchTopicId": "660e8400-e29b-41d4-a716-446655440001",
    "startTime": "2026-02-20T10:00:00",
    "message": "Booked"
  }
  ```
- **Error (duplicate slot):** `409 Conflict`
  ```json
  {
    "message": "Time slot already booked",
    "status": 409
  }
  ```

**GET** `/api/appointments/available`

- Get available timeslots for a branch/topic on a given date
- **Query Parameters:**
  - `branchTopicId` (UUID) – BranchTopic ID
  - `date` (string) – YYYY-MM-DD format
- **Response:** `200 OK`
  ```json
  []
  ```
  _(Placeholder; implement actual slot availability logic)_

---

## Key Features

### 1. Double-Booking Prevention

Before saving an appointment, `AppointmentServiceImpl.bookAppointment()` checks:

```java
boolean exists = appointmentRepository.existsByBranchTopicIdAndStartTime(branchTopicId, start);
if (exists) {
    throw new IllegalStateException("Time slot already booked");
}
```

- Check is transactional to ensure atomicity
- Database unique constraint on `(branch_topic_id, start_time)` as backup

### 2. User Management

- Users are created via `POST /api/users`
- `UserService.findOrCreate()` allows re-using existing users by email
- Passwords/auth not implemented (school project scope)

### 3. Branch & Topic Queries

- Branch and Topic entities are read-only (no POST endpoints)
- Populate via H2 console or SQL inserts during development

### 4. DTOs Decouple API from Schema

- Controllers never expose `@Entity` objects
- Allows schema changes without API breaking changes
- Example: `CreateAppointmentRequest` uses UUIDs, not entity references

---

## Configuration

### application.properties

```properties
# Server
server.port=8080

# H2 Database (in-memory)
spring.datasource.url=jdbc:h2:mem:appointmentdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=false

# Devtools
spring.devtools.restart.enabled=true
```

**Notes:**

- `create-drop` – Schema auto-created on startup, dropped on shutdown
- H2 console accessible at `/h2-console` for debugging/manual data entry
- Change to `spring.jpa.hibernate.ddl-auto=validate` for production

---

## Testing

### Build

```bash
mvn -f backend/pom.xml clean package
```

### Run

```bash
mvn -f backend/pom.xml spring-boot:run
```

App starts on `http://localhost:8080`.

### Test Flow

1. **Create a user:**

   ```bash
   curl -X POST http://localhost:8080/api/users \
     -H "Content-Type: application/json" \
     -d '{"name":"Alice","email":"alice@test.com"}'
   ```

   Save the returned `userId`.

2. **Get branches:**

   ```bash
   curl -X GET http://localhost:8080/api/branches
   ```

   Save a `branchId`.

3. **Insert test data via H2 console:**
   - Open `http://localhost:8080/h2-console`
   - Login with defaults (username: `sa`, password: empty)
   - Insert branches, topics, and branch_topics:
     ```sql
     INSERT INTO branches (id, name) VALUES (RANDOM_UUID(), 'New York');
     INSERT INTO topics (id, name) VALUES (RANDOM_UUID(), 'Support');
     INSERT INTO branch_topics (id, branch_id, topic_id)
       VALUES (RANDOM_UUID(), '{branchId}', '{topicId}');
     ```
   - Copy returned UUIDs for next steps.

4. **Book an appointment:**

   ```bash
   curl -X POST http://localhost:8080/api/appointments \
     -H "Content-Type: application/json" \
     -d '{
       "userId":"{userId}",
       "branchTopicId":"{branchTopicId}",
       "startTime":"2026-02-20T10:00:00",
       "reason":"Test"
     }'
   ```

5. **Try duplicate booking (should fail):**
   ```bash
   curl -X POST http://localhost:8080/api/appointments \
     -H "Content-Type: application/json" \
     -d '{
       "userId":"{userId}",
       "branchTopicId":"{branchTopicId}",
       "startTime":"2026-02-20T10:00:00",
       "reason":"Duplicate"
     }'
   ```
   Expected: `409 Conflict` with message "Time slot already booked"

---

## Dependencies

- **Spring Boot 3.2.0** – Web, JPA, Validation
- **H2** – In-memory database
- **Hibernate** – ORM with Hibernate 6 (UUID support)
- **Jakarta EE** – Modern JPA annotations

---

## Future Enhancements

1. **Implement `/api/appointments/available`** – Query logic for open slots
2. **User authentication** – Add Spring Security with JWT
3. **Notifications** – Email/SMS on booking confirmation
4. **Admin endpoints** – Manage branches, topics, timeslots
5. **Pagination** – Add Spring Data pagination to list endpoints
6. **Audit logging** – Track who booked and when
7. **Database migrations** – Use Flyway or Liquibase for schema versions

---

## Troubleshooting

| Issue                              | Solution                                                                               |
| ---------------------------------- | -------------------------------------------------------------------------------------- |
| Port 8080 already in use           | Change `server.port` in application.properties                                         |
| H2 console login fails             | Username: `sa`, Password: (empty), JDBC URL: `jdbc:h2:mem:appointmentdb`               |
| Duplicate appointment not rejected | Ensure `spring.jpa.hibernate.ddl-auto=create-drop` is set; schema recreates on startup |
| DTOs don't have getters/setters    | Spring uses reflection; ensure DTO fields are public or accessors exist                |
| UUIDs are null after save          | Confirm `@UuidGenerator` is on entity `id` field                                       |

---

## Team Notes

- This is a school project; keep code simple and production-style
- All entities use UUID to support distributed systems
- H2 database auto-resets on each startup (good for testing, bad for persistence)
- For persistent database, switch to PostgreSQL by updating `pom.xml` and `application.properties`
