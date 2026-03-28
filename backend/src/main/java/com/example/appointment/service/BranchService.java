// Licensed under the MIT License
package com.example.appointment.service;

import com.example.appointment.model.Branch;
import com.example.appointment.repository.BranchRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BranchService {

    private final BranchRepository repository;

    public BranchService(BranchRepository repository) {
        this.repository = repository;
    }

    public Branch create(Branch branch) {
        return repository.save(branch);
    }

    public Optional<Branch> findById(Long id) {
        return repository.findById(id);
    }

    public List<Branch> findAll() {
        return repository.findAll();
    }

    public Branch update(Branch branch) {
        return repository.save(branch);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<Branch> findByName(String name) {
        return repository.findByName(name);
    }
}
