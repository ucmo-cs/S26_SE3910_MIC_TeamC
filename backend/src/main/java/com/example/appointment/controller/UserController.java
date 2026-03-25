// Licensed under the MIT License
package com.example.appointment.controller;

import com.example.appointment.dto.CreateUserRequest;
import com.example.appointment.model.User;
import com.example.appointment.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * REST controller for user management.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController (UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser (@Valid @RequestBody CreateUserRequest request) {
        User user = userService.create(request);
        UserDto dto = new UserDto(user.getId(), user.getName(), user.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    /**
     * Simple DTO for user response.
     */
    public static class UserDto {
        private UUID id;
        private String name;
        private String email;

        public UserDto (UUID id, String name, String email) {
            this.id = id;
            this.name = name;
            this.email = email;
        }

        public UUID getId () {
            return id;
        }

        public void setId (UUID id) {
            this.id = id;
        }

        public String getName () {
            return name;
        }

        public void setName (String name) {
            this.name = name;
        }

        public String getEmail () {
            return email;
        }

        public void setEmail (String email) {
            this.email = email;
        }
    }
}
