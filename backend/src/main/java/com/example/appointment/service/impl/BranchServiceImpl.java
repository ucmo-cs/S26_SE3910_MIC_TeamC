// Licensed under the MIT License
package com.example.appointment.service.impl;

import com.example.appointment.model.Branch;
import com.example.appointment.repository.BranchRepository;
import com.example.appointment.service.BranchService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BranchServiceImpl implements BranchService {

    private final BranchRepository repository;

    public BranchServiceImpl (BranchRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<Branch> findById (UUID id) {
        return repository.findById(id);
    }

    @Override
    public Optional<Branch> findByName (String name) {
        return repository.findAll().stream().filter(b -> b.getName() != null && b.getName().equalsIgnoreCase(name))
                .findFirst();
    }

    @Override
    public List<Branch> findAll () {
        return repository.findAll();
    }
}
