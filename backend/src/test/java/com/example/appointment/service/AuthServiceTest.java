// Licensed under the MIT License
package com.example.appointment.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Unit tests for AuthService.
 */
@DataJpaTest
@Import({ AuthService.class, BCryptPasswordEncoder.class })
@DisplayName("AuthService Tests")
class AuthServiceTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String TEST_USERNAME = "testuser";
    private static final String TEST_EMAIL = "test@example.com";
    private static final String TEST_NAME = "Test User";
    private static final String TEST_PASSWORD = "securepassword123";

    @BeforeEach
    void setUp() {
        // Clear repository before each test
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("Should register user successfully")
    void testRegisterUserSuccess() {
        // Act
        User registeredUser = authService.register(TEST_USERNAME, TEST_EMAIL, TEST_NAME, TEST_PASSWORD);

        // Assert
        assertNotNull(registeredUser);
        assertEquals(TEST_USERNAME, registeredUser.getUsername());
        assertEquals(TEST_EMAIL, registeredUser.getEmail());
        assertEquals(TEST_NAME, registeredUser.getName());
        // Password should be hashed, not plaintext
        assertTrue(passwordEncoder.matches(TEST_PASSWORD, registeredUser.getPassword()));
    }

    @Test
    @DisplayName("Should throw exception when registering with duplicate username")
    void testRegisterDuplicateUsername() {
        // Arrange
        authService.register(TEST_USERNAME, "email1@example.com", TEST_NAME, TEST_PASSWORD);

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            authService.register(TEST_USERNAME, "email2@example.com", "Another User", TEST_PASSWORD);
        });
        assertEquals("Username already exists: " + TEST_USERNAME, exception.getMessage());
    }

    @Test
    @DisplayName("Should throw exception when registering with duplicate email")
    void testRegisterDuplicateEmail() {
        // Arrange
        authService.register("user1", TEST_EMAIL, TEST_NAME, TEST_PASSWORD);

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            authService.register("user2", TEST_EMAIL, "Another User", TEST_PASSWORD);
        });
        assertEquals("Email already exists: " + TEST_EMAIL, exception.getMessage());
    }

    @Test
    @DisplayName("Should authenticate user with correct password")
    void testAuthenticateSuccess() {
        // Arrange
        authService.register(TEST_USERNAME, TEST_EMAIL, TEST_NAME, TEST_PASSWORD);

        // Act
        Optional<User> authenticatedUser = authService.authenticate(TEST_USERNAME, TEST_PASSWORD);

        // Assert
        assertTrue(authenticatedUser.isPresent());
        assertEquals(TEST_USERNAME, authenticatedUser.get().getUsername());
    }

    @Test
    @DisplayName("Should not authenticate user with incorrect password")
    void testAuthenticateFailure() {
        // Arrange
        authService.register(TEST_USERNAME, TEST_EMAIL, TEST_NAME, TEST_PASSWORD);

        // Act
        Optional<User> authenticatedUser = authService.authenticate(TEST_USERNAME, "wrongpassword");

        // Assert
        assertTrue(authenticatedUser.isEmpty());
    }

    @Test
    @DisplayName("Should not authenticate non-existent user")
    void testAuthenticateNonExistent() {
        // Act
        Optional<User> authenticatedUser = authService.authenticate("nonexistent", TEST_PASSWORD);

        // Assert
        assertTrue(authenticatedUser.isEmpty());
    }

    @Test
    @DisplayName("Should find user by username")
    void testFindByUsername() {
        // Arrange
        authService.register(TEST_USERNAME, TEST_EMAIL, TEST_NAME, TEST_PASSWORD);

        // Act
        Optional<User> foundUser = authService.findByUsername(TEST_USERNAME);

        // Assert
        assertTrue(foundUser.isPresent());
        assertEquals(TEST_USERNAME, foundUser.get().getUsername());
        assertEquals(TEST_EMAIL, foundUser.get().getEmail());
    }

    @Test
    @DisplayName("Should return empty when finding non-existent user")
    void testFindByUsernameNotFound() {
        // Act
        Optional<User> foundUser = authService.findByUsername("nonexistent");

        // Assert
        assertTrue(foundUser.isEmpty());
    }

    @Test
    @DisplayName("Should hash password with BCrypt")
    void testPasswordHashing() {
        // Arrange
        User user1 = authService.register("user1", "user1@example.com", "User 1", TEST_PASSWORD);
        User user2 = authService.register("user2", "user2@example.com", "User 2", TEST_PASSWORD);

        // Assert - same plaintext password should result in different hashes
        assertTrue(passwordEncoder.matches(TEST_PASSWORD, user1.getPassword()));
        assertTrue(passwordEncoder.matches(TEST_PASSWORD, user2.getPassword()));
        // Two different BCrypt hashes of the same password should not be equal
        assertEquals(false, user1.getPassword().equals(user2.getPassword()));
    }
}
