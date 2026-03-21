// Licensed under the MIT License
package com.example.appointment.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;
import java.util.UUID;

import com.example.appointment.model.Topic;
import com.example.appointment.repository.TopicRepository;
import com.example.appointment.service.impl.TopicServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

/**
 * Unit tests for TopicService.
 */
@DataJpaTest
@Import(TopicServiceImpl.class)
@DisplayName("TopicService Tests")
class TopicServiceTest {

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private TopicService topicService;

    private Topic testTopic;

    @BeforeEach
    void setUp () {
        testTopic = new Topic();
        testTopic.setId(UUID.fromString("00000000-0000-0000-0000-000000000001"));
        testTopic.setName("Test Topic");

        topicRepository.save(testTopic);
    }

    @Test
    @DisplayName("Should find topic by ID successfully")
    void testFindById () {
        // Act
        Optional<Topic> foundTopic = topicService.findById(testTopic.getId());

        // Assert
        assertNotNull(foundTopic);
        assertTrue(foundTopic.isPresent());
        assertEquals(testTopic.getId(), foundTopic.get().getId());
        assertEquals("Test Topic", foundTopic.get().getName());
    }
}