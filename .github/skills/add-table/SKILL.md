---
name: spring-boot-add-entity
description: Add a new JPA entity table to Spring Boot backend with full CRUD layers (domain, repository, service, controller) and unit tests. Use when: adding a new table/entity to the database and implementing it across backend layers.
---

# Spring Boot Add Entity

This skill guides the process of adding a new JPA entity to a Spring Boot application, including creating the domain model, repository, service, and controller layers, followed by unit tests for the repository and service.

## Prerequisites

- Spring Boot project with JPA/Hibernate configured.
- Existing layered structure: `domain`, `repository`, `service`, `controller` packages.
- Unit testing setup with JUnit 5, AssertJ, and Spring Boot Test.

## Steps

### 1. Domain Layer

Create an entity class in the `domain` package. This represents the database table.

**Example Entity Class:**

```java
package com.example.demo.domain;

import jakarta.persistence.*;
import java.util.List; // or other types as needed

@Entity
@Table(name = "entity_table") // Replace with actual table name
public class EntityName { // Replace with actual entity name

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // Example field

    // Add relationships if needed, e.g., @ManyToOne, @OneToMany
    // @ManyToOne
    // @JoinColumn(name = "related_id")
    // private RelatedEntity relatedEntity;

    // Constructors
    public EntityName() {}

    public EntityName(Long id, String name) { // Adjust parameters
        this.id = id;
        this.name = name;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    // toString, equals, hashCode as needed
}
```

- Replace `EntityName` with the actual entity class name.
- Add fields, relationships, and annotations as required for the table schema.
- Ensure the class is annotated with `@Entity` and has an `@Id` field.

### 2. Repository Layer

Create a repository interface in the `repository` package, extending `JpaRepository`.

**Example Repository Interface:**

```java
package com.example.demo.repository;

import com.example.demo.domain.EntityName;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EntityNameRepository extends JpaRepository<EntityName, Long> {

    // Custom query methods
    List<EntityName> findByName(String name); // Example custom finder

    // Add more custom methods as needed, e.g., findByField, deleteByField
}
```

- Replace `EntityName` with the actual entity name.
- The interface extends `JpaRepository<EntityName, Long>` for basic CRUD operations.
- Add custom query methods using Spring Data JPA naming conventions.

### 3. Service Layer

Create a service class in the `service` package to handle business logic.

**Example Service Class:**

```java
package com.example.demo.service;

import com.example.demo.domain.EntityName;
import com.example.demo.repository.EntityNameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EntityNameService {

    @Autowired
    private EntityNameRepository entityNameRepository;

    public EntityName save(EntityName entity) {
        return entityNameRepository.save(entity);
    }

    public Optional<EntityName> findById(Long id) {
        return entityNameRepository.findById(id);
    }

    public List<EntityName> findAll() {
        return entityNameRepository.findAll();
    }

    public List<EntityName> findByName(String name) {
        return entityNameRepository.findByName(name);
    }

    public void deleteById(Long id) {
        entityNameRepository.deleteById(id);
    }

    // Add more business logic methods as needed
}
```

- Replace `EntityName` with the actual entity name.
- Inject the repository using `@Autowired`.
- Implement methods for CRUD operations and custom logic.

### 4. Controller Layer

Create a REST controller in the `controller` package to expose endpoints.

**Example Controller Class:**

```java
package com.example.demo.controller;

import com.example.demo.domain.EntityName;
import com.example.demo.service.EntityNameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/entitynames") // Replace with appropriate path
public class EntityNameController {

    @Autowired
    private EntityNameService entityNameService;

    @PostMapping
    public ResponseEntity<EntityName> create(@RequestBody EntityName entity) {
        EntityName saved = entityNameService.save(entity);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntityName> getById(@PathVariable Long id) {
        return entityNameService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<EntityName>> getAll() {
        List<EntityName> entities = entityNameService.findAll();
        return ResponseEntity.ok(entities);
    }

    @GetMapping("/search")
    public ResponseEntity<List<EntityName>> searchByName(@RequestParam String name) {
        List<EntityName> entities = entityNameService.findByName(name);
        return ResponseEntity.ok(entities);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        entityNameService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Add more endpoints as needed
}
```

- Replace `EntityName` with the actual entity name.
- Use `@RestController` and `@RequestMapping` for REST endpoints.
- Inject the service and map HTTP methods to service calls.

### 5. Unit Tests

Create unit test files for the repository and service layers. Use the structure from `BookRepositoryTest.java` as a guide: `@DataJpaTest` for repository tests, and `@ExtendWith(MockitoExtension.class)` for service tests to mock dependencies.

#### Repository Test Example

Create `EntityNameRepositoryTest.java` in the test repository package.

```java
package com.example.demo.repository;

import com.example.demo.domain.EntityName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class EntityNameRepositoryTest {

    @Autowired
    private EntityNameRepository entityNameRepository;

    @Test
    void save_entity() {
        // given
        EntityName entity = new EntityName(null, "Test Name");

        // when
        EntityName saved = entityNameRepository.save(entity);

        // then
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getName()).isEqualTo("Test Name");
    }

    @Test
    void findById_returns_correct_entity() {
        // given
        EntityName entity = new EntityName(null, "Test Name");
        EntityName saved = entityNameRepository.save(entity);

        // when
        Optional<EntityName> found = entityNameRepository.findById(saved.getId());

        // then
        assertThat(found).isPresent();
        assertThat(found.get().getName()).isEqualTo("Test Name");
    }

    @Test
    void findAll_returns_all_entities() {
        // given
        entityNameRepository.save(new EntityName(null, "Name1"));
        entityNameRepository.save(new EntityName(null, "Name2"));

        // when
        List<EntityName> entities = entityNameRepository.findAll();

        // then
        assertThat(entities).hasSize(2);
    }

    @Test
    void findByName_returns_matching_entities() {
        // given
        entityNameRepository.save(new EntityName(null, "Test Name"));
        entityNameRepository.save(new EntityName(null, "Other Name"));

        // when
        List<EntityName> found = entityNameRepository.findByName("Test Name");

        // then
        assertThat(found).hasSize(1);
        assertThat(found.get(0).getName()).isEqualTo("Test Name");
    }

    // Add more tests for custom methods
}
```

- Replace `EntityName` with the actual entity name.
- Adapt test data and assertions to the entity's fields.
- Test basic CRUD and custom repository methods.

#### Service Test Example

Create `EntityNameServiceTest.java` in the test service package.

```java
package com.example.demo.service;

import com.example.demo.domain.EntityName;
import com.example.demo.repository.EntityNameRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EntityNameServiceTest {

    @Mock
    private EntityNameRepository entityNameRepository;

    @InjectMocks
    private EntityNameService entityNameService;

    @Test
    void save_entity() {
        // given
        EntityName entity = new EntityName(null, "Test Name");
        when(entityNameRepository.save(any(EntityName.class))).thenReturn(entity);

        // when
        EntityName saved = entityNameService.save(entity);

        // then
        assertThat(saved.getName()).isEqualTo("Test Name");
    }

    @Test
    void findById_returns_entity() {
        // given
        EntityName entity = new EntityName(1L, "Test Name");
        when(entityNameRepository.findById(1L)).thenReturn(Optional.of(entity));

        // when
        Optional<EntityName> found = entityNameService.findById(1L);

        // then
        assertThat(found).isPresent();
        assertThat(found.get().getName()).isEqualTo("Test Name");
    }

    @Test
    void findAll_returns_list() {
        // given
        List<EntityName> entities = Arrays.asList(
            new EntityName(1L, "Name1"),
            new EntityName(2L, "Name2")
        );
        when(entityNameRepository.findAll()).thenReturn(entities);

        // when
        List<EntityName> result = entityNameService.findAll();

        // then
        assertThat(result).hasSize(2);
    }

    @Test
    void findByName_returns_matching_entities() {
        // given
        List<EntityName> entities = Arrays.asList(new EntityName(1L, "Test Name"));
        when(entityNameRepository.findByName("Test Name")).thenReturn(entities);

        // when
        List<EntityName> result = entityNameService.findByName("Test Name");

        // then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getName()).isEqualTo("Test Name");
    }

    // Add more tests for other service methods
}
```

- Replace `EntityName` with the actual entity name.
- Use Mockito to mock the repository.
- Test service methods by stubbing repository calls and verifying results.

## Validation

After implementing:

- Run the application and test endpoints with a tool like Postman.
- Execute unit tests to ensure they pass.
- Check database schema generation or migrations if applicable.
