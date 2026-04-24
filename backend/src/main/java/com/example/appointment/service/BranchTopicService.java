// Licensed under the MIT License
package com.example.appointment.service;

import com.example.appointment.model.Branch;
import com.example.appointment.model.BranchTopic;
import com.example.appointment.model.Topic;
import com.example.appointment.repository.BranchRepository;
import com.example.appointment.repository.BranchTopicRepository;
import com.example.appointment.repository.TopicRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BranchTopicService {

    private final BranchTopicRepository repository;
    private final BranchRepository branchRepository;
    private final TopicRepository topicRepository;

    public BranchTopic create(BranchTopic branchTopic) {
        if (branchTopic.getBranch() != null && branchTopic.getTopic() != null) {
            Branch branch = branchRepository
                    .findById(branchTopic.getBranch().getId())
                    .orElseThrow();
            Topic topic = topicRepository
                    .findById(branchTopic.getTopic().getId())
                    .orElseThrow();

            branchTopic.setBranch(branch);
            branchTopic.setTopic(topic);
        }
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