// Licensed under the MIT License
package com.example.appointment.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.appointment.controller.dto.LoginRequest;
import com.example.appointment.controller.dto.RegisterRequest;
import com.example.appointment.model.User;
import com.example.appointment.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

/**
 * Integration tests for AuthController.
 */
@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("AuthController Integration Tests")
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String API_BASE_URL = "/api/auth";
    private static final String TEST_USERNAME = "testuser";
    private static final String TEST_EMAIL = "test@example.com";
    private static final String TEST_NAME = "Test User";
    private static final String TEST_PASSWORD = "securepassword123";

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("Should register user successfully")
    void testRegisterSuccess() throws Exception {
        // Arrange
        RegisterRequest request = new RegisterRequest(TEST_USERNAME, TEST_EMAIL, TEST_NAME, TEST_PASSWORD);

        // Act & Assert
        mockMvc.perform(post(API_BASE_URL + "/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username").value(TEST_USERNAME))
                .andExpect(jsonPath("$.email").value(TEST_EMAIL))
                .andExpect(jsonPath("$.name").value(TEST_NAME))
                .andExpect(jsonPath("$.password").doesNotExist()); // Password should not be returned
    }

    @Test
    @DisplayName("Should fail registration with duplicate username")
    void testRegisterDuplicateUsername() throws Exception {
        // Arrange
        RegisterRequest request1 = new RegisterRequest(TEST_USERNAME, "email1@example.com", TEST_NAME,
                TEST_PASSWORD);
        RegisterRequest request2 = new RegisterRequest(TEST_USERNAME, "email2@example.com", "Another User",
                TEST_PASSWORD);

        mockMvc.perform(post(API_BASE_URL + "/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request1)))
                .andExpect(status().isCreated());

        // Act & Assert
        mockMvc.perform(post(API_BASE_URL + "/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request2)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Username already exists: " + TEST_USERNAME));
    }

    @Test
    @DisplayName("Should fail registration with duplicate email")
    void testRegisterDuplicateEmail() throws Exception {
        // Arrange
        RegisterRequest request1 = new RegisterRequest("user1", TEST_EMAIL, TEST_NAME, TEST_PASSWORD);
        RegisterRequest request2 = new RegisterRequest("user2", TEST_EMAIL, "Another User", TEST_PASSWORD);

        mockMvc.perform(post(API_BASE_URL + "/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request1)))
                .andExpect(status().isCreated());

        // Act & Assert
        mockMvc.perform(post(API_BASE_URL + "/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request2)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Email already exists: " + TEST_EMAIL));
    }

    @Test
    @DisplayName("Should login successfully")
    void testLoginSuccess() throws Exception {
        // Arrange - Register a user first
        User user = new User(TEST_NAME, TEST_USERNAME, TEST_EMAIL,
                passwordEncoder.encode(TEST_PASSWORD));
        userRepository.save(user);

        LoginRequest loginRequest = new LoginRequest(TEST_USERNAME, TEST_PASSWORD);

        // Act & Assert
        MvcResult result = mockMvc.perform(post(API_BASE_URL + "/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(TEST_USERNAME))
                .andExpect(jsonPath("$.email").value(TEST_EMAIL))
                .andExpect(jsonPath("$.password").doesNotExist())
                .andReturn();

        // Verify session is created
        assertThat(result.getRequest().getSession()).isNotNull();
    }

    @Test
    @DisplayName("Should fail login with incorrect password")
    void testLoginIncorrectPassword() throws Exception {
        // Arrange
        User user = new User(TEST_NAME, TEST_USERNAME, TEST_EMAIL,
                passwordEncoder.encode(TEST_PASSWORD));
        userRepository.save(user);

        LoginRequest loginRequest = new LoginRequest(TEST_USERNAME, "wrongpassword");

        // Act & Assert
        mockMvc.perform(post(API_BASE_URL + "/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Invalid username or password"));
    }

    @Test
    @DisplayName("Should fail login with non-existent user")
    void testLoginNonExistent() throws Exception {
        // Arrange
        LoginRequest loginRequest = new LoginRequest("nonexistent", TEST_PASSWORD);

        // Act & Assert
        mockMvc.perform(post(API_BASE_URL + "/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Invalid username or password"));
    }

    @Test
    @DisplayName("Should logout successfully")
    void testLogoutSuccess() throws Exception {
        // Act & Assert
        mockMvc.perform(post(API_BASE_URL + "/logout"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Logged out successfully"));
    }

    @Test
    @DisplayName("Should fail getting current user when not authenticated")
    void testGetCurrentUserNotAuthenticated() throws Exception {
        // Act & Assert
        mockMvc.perform(get(API_BASE_URL + "/me"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Not authenticated"));
    }
}
