// Licensed under the MIT License
package com.example.appointment.service;

import com.example.appointment.model.User;
import com.example.appointment.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service for user authentication and registration.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Register a new user with username, email, and password.
     *
     * @param username the unique username
     * @param email the email address
     * @param name the user's full name
     * @param password the plaintext password (will be hashed)
     * @return the created user
     * @throws IllegalArgumentException if username or email already exists
     */
    public User register(String username, String email, String name, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("Username already exists: " + username);
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already exists: " + email);
        }

        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(name, username, email, hashedPassword);
        return userRepository.save(user);
    }

    /**
     * Authenticate a user by username and password.
     *
     * @param username the username
     * @param password the plaintext password
     * @return an Optional containing the user if authentication succeeds
     */
    public Optional<User> authenticate(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }

    /**
     * Find a user by username.
     *
     * @param username the username
     * @return an Optional containing the user if found
     */
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
