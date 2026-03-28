// Licensed under the MIT License
package com.example.appointment.service;

import com.example.appointment.model.BranchTopic;
import com.example.appointment.repository.BranchTopicRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BranchTopicService {

    private final BranchTopicRepository repository;

    public BranchTopicService(BranchTopicRepository repository) {
        this.repository = repository;
    }

    public BranchTopic create(BranchTopic branchTopic) {
        return repository.save(branchTopic);
    }

    public Optional<BranchTopic> findById(Long id) {
        return repository.findById(id);
    }

    public List<BranchTopic> findAll() {
        return repository.findAll();
    }

    public BranchTopic update(BranchTopic branchTopic) {
        return repository.save(branchTopic);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<BranchTopic> findByBranchId(Long branchId) {
        return repository.findByBranchId(branchId);
    }

    public List<BranchTopic> findByTopicId(Long topicId) {
        return repository.findByTopicId(topicId);
    }
}