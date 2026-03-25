// Licensed under the MIT License
package com.example.appointment.service.impl;

import com.example.appointment.dto.CreateUserRequest;
import com.example.appointment.model.User;
import com.example.appointment.repository.UserRepository;
import com.example.appointment.service.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    public UserServiceImpl (UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public User findOrCreate (String name, String email) {
        Optional<User> existing = repository.findByEmail(email);
        if (existing.isPresent())
            return existing.get();
        User u = new User();
        u.setName(name);
        u.setEmail(email);
        return repository.save(u);
    }

    @Override
    public Optional<User> findById (UUID id) {
        return repository.findById(id);
    }

    @Override
    public User create (CreateUserRequest request) {
        User u = new User();
        u.setName(request.getName());
        u.setEmail(request.getEmail());
        return repository.save(u);
    }
}
