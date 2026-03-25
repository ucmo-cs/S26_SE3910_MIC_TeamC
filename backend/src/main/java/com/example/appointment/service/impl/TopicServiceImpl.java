// Licensed under the MIT License
package com.example.appointment.service.impl;

import com.example.appointment.model.Topic;
import com.example.appointment.repository.TopicRepository;
import com.example.appointment.service.TopicService;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class TopicServiceImpl implements TopicService {

    private final TopicRepository repository;

    public TopicServiceImpl (TopicRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<Topic> findById (UUID id) {
        return repository.findById(id);
    }
}
