// Licensed under the MIT License
package com.example.appointment.service;

import com.example.appointment.model.User;
import com.example.appointment.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        return repository.save(u);
    }
}
