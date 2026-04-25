// Licensed under the MIT License
package com.example.appointment.service;

import com.example.appointment.model.User;
import com.example.appointment.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User create(User user) {
        return repository.save(user);
    }

    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }

    public List<User> findAll() {
        return repository.findAll();
    }

    public User update(User user) {
        return repository.save(user);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    public User findOrCreate(String name, String email) {
        Optional<User> existing = repository.findByEmail(email);
        if (existing.isPresent()) {
            return existing.get();
        }
        User u = new User();
        u.setName(name);
        u.setEmail(email);
        // Required DB columns for local users: create a deterministic username and
        // a non-null placeholder password for externally provisioned users.
        u.setUsername(buildUniqueUsername(email));
        u.setPassword("EXTERNAL_AUTH_USER");
        return repository.save(u);
    }

    private String buildUniqueUsername(String email) {
        String base = email;
        String candidate = base;

        while (repository.findByUsername(candidate).isPresent()) {
            candidate = base + "_" + UUID.randomUUID().toString().substring(0, 8);
        }

        return candidate;
    }
}
