// Licensed under the MIT License
package com.example.appointment.service;

import com.example.appointment.model.Topic;
import com.example.appointment.repository.TopicRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicService {

    private final TopicRepository repository;

    public TopicService(TopicRepository repository) {
        this.repository = repository;
    }

    public Topic create(Topic topic) {
        return repository.save(topic);
    }

    public Optional<Topic> findById(Long id) {
        return repository.findById(id);
    }

    public List<Topic> findAll() {
        return repository.findAll();
    }

    public Topic update(Topic topic) {
        return repository.save(topic);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<Topic> findByName(String name) {
        return repository.findByName(name);
    }
}
