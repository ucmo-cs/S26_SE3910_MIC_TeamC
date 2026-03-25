// Licensed under the MIT License
package com.example.appointment.service;

import com.example.appointment.model.Topic;

import java.util.Optional;
import java.util.UUID;

public interface TopicService {
    Optional<Topic> findById (UUID id);
}
