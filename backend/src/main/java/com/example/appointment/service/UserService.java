// Licensed under the MIT License
package com.example.appointment.service;

import com.example.appointment.model.User;
import com.example.appointment.dto.CreateUserRequest;

import java.util.Optional;
import java.util.UUID;

public interface UserService {
    User findOrCreate (String name, String email);

    Optional<User> findById (UUID id);

    User create (CreateUserRequest request);
}
