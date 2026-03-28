// Licensed under the MIT License
package com.example.appointment.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Optional;

import com.example.appointment.model.Topic;
import com.example.appointment.repository.TopicRepository;
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
@Import(TopicService.class)
@DisplayName("TopicService Tests")
class TopicServiceTest {

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private TopicService topicService;

    private Topic testTopic;

    @BeforeEach
    void setUp() {
        testTopic = new Topic(null, "Test Topic");
        testTopic = topicRepository.save(testTopic);
    }

    @Test
    @DisplayName("Should find topic by ID successfully")
    void testFindById() {
        // Act
        Optional<Topic> foundTopic = topicService.findById(testTopic.getId());

        // Assert
        assertNotNull(foundTopic);
        assertTrue(foundTopic.isPresent());
        assertEquals(testTopic.getId(), foundTopic.get().getId());
        assertEquals("Test Topic", foundTopic.get().getName());
    }

    @Test
    @DisplayName("Should find all topics successfully")
    void testFindAll() {
        // Act
        List<Topic> foundTopics = topicService.findAll();

        // Assert
        assertNotNull(foundTopics);
        assertEquals(1, foundTopics.size());
        assertEquals("Test Topic", foundTopics.get(0).getName());
    }

    @Test
    @DisplayName("Should find topic by name successfully")
    void testFindByName() {
        // Act
        List<Topic> foundTopics = topicService.findByName("Test Topic");

        // Assert
        assertNotNull(foundTopics);
        assertEquals(1, foundTopics.size());
        assertEquals("Test Topic", foundTopics.get(0).getName());
    }
}