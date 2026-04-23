// Licensed under the MIT License
package com.example.appointment.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import com.example.appointment.model.User;
import com.example.appointment.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

/**
 * Unit tests for UserService.
 */
@DataJpaTest
@Import(UserService.class)
@DisplayName("UserService Tests")
class UserServiceTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User("John Doe", "johndoe", "john@example.com", "hashedpassword");
        testUser = userRepository.save(testUser);
    }

    @Test
    @DisplayName("Should save user successfully")
    void testSaveUser() {
        // Act
        User newUser = new User("Jane Doe", "janedoe", "jane@example.com", "hashedpassword");
        User savedUser = userService.create(newUser);

        // Assert
        assertNotNull(savedUser);
        assertEquals("Jane Doe", savedUser.getName());
        assertEquals("jane@example.com", savedUser.getEmail());
    }

    @Test
    @DisplayName("Should retrieve user by ID successfully")
    void testGetUserById() {
        // Act
        Optional<User> foundUser = userService.findById(testUser.getId());

        // Assert
        assertNotNull(foundUser);
        assertTrue(foundUser.isPresent());
        assertEquals(testUser.getId(), foundUser.get().getId());
        assertEquals("John Doe", foundUser.get().getName());
    }

    @Test
    @DisplayName("Should find existing user by email in findOrCreate")
    void testFindOrCreateExistingUser() {
        // Act
        User foundUser = userService.findOrCreate("John Doe", "john@example.com");

        // Assert
        assertNotNull(foundUser);
        assertEquals(testUser.getId(), foundUser.getId());
        assertEquals("John Doe", foundUser.getName());
        assertEquals("john@example.com", foundUser.getEmail());
    }

    @Test
    @DisplayName("Should create new user in findOrCreate when not found")
    void testFindOrCreateNewUser() {
        // Act
        User createdUser = userService.findOrCreate("Jane Doe", "jane@example.com");

        // Assert
        assertNotNull(createdUser);
        assertEquals("Jane Doe", createdUser.getName());
        assertEquals("jane@example.com", createdUser.getEmail());
    }
}
