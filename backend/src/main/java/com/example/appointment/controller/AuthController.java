// Licensed under the MIT License
package com.example.appointment.controller;

import com.example.appointment.controller.dto.LoginRequest;
import com.example.appointment.controller.dto.RegisterRequest;
import com.example.appointment.controller.dto.UserResponse;
import com.example.appointment.model.User;
import com.example.appointment.service.AuthService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for authentication (login, register, logout).
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Register a new user.
     *
     * @param request the registration request with username, email, name, password
     * @return UserResponse with created user data
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request, HttpSession session) {
        try {
            User user = authService.register(request.getUsername(), request.getEmail(), request.getName(),
                    request.getPassword());
            
            // Manually authenticate the user in Spring Security
            UsernamePasswordAuthenticationToken token = 
                new UsernamePasswordAuthenticationToken(
                    user.getUsername(), 
                    null, 
                    List.of(new SimpleGrantedAuthority("ROLE_USER"))
                );
            SecurityContextHolder.getContext().setAuthentication(token);
            
            // Persist the SecurityContext to the session
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
            
            UserResponse response = UserResponse.fromUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    /**
     * Login a user with username and password.
     *
     * @param request the login request with username and password
     * @param session the HTTP session (Spring Security will create it)
     * @return UserResponse if authentication succeeds
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpSession session) {
        Optional<User> user = authService.authenticate(request.getUsername(), request.getPassword());
        if (user.isPresent()) {
            // Manually authenticate the user in Spring Security
            UsernamePasswordAuthenticationToken token = 
                new UsernamePasswordAuthenticationToken(
                    user.get().getUsername(), 
                    null, 
                    List.of(new SimpleGrantedAuthority("ROLE_USER"))
                );
            SecurityContextHolder.getContext().setAuthentication(token);
            
            // Persist the SecurityContext to the session
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
            
            // Also set in session for reference
            session.setAttribute("userId", user.get().getId());
            session.setAttribute("username", user.get().getUsername());
            UserResponse response = UserResponse.fromUser(user.get());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Invalid username or password"));
    }

    /**
     * Logout the current user by invalidating the session.
     *
     * @param session the HTTP session
     * @return success response
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(new SuccessResponse("Logged out successfully"));
    }

    /**
     * Get the currently authenticated user.
     *
     * @param authentication the Spring Security authentication object
     * @return UserResponse for the current user
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Not authenticated"));
        }

        // Extract username from authentication
        String username = authentication.getName();
        Optional<User> user = authService.findByUsername(username);

        if (user.isPresent()) {
            UserResponse response = UserResponse.fromUser(user.get());
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse("User not found"));
    }

    /**
     * Simple error response wrapper.
     */
    public static class ErrorResponse {
        private String error;

        public ErrorResponse(String error) {
            this.error = error;
        }

        public String getError() {
            return error;
        }

        public void setError(String error) {
            this.error = error;
        }
    }

    /**
     * Simple success response wrapper.
     */
    public static class SuccessResponse {
        private String message;

        public SuccessResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
