// Licensed under the MIT License
package com.example.appointment.controller.dto;

import com.example.appointment.model.User;

/**
 * Response DTO for user information (excludes password).
 */
public class UserResponse {

    private Long id;
    private String username;
    private String email;
    private String name;

    public UserResponse() {
    }

    public UserResponse(Long id, String username, String email, String name) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.name = name;
    }

    /**
     * Create a UserResponse from a User entity.
     *
     * @param user the user entity
     * @return UserResponse without password
     */
    public static UserResponse fromUser(User user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getName());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
