// Licensed under the MIT License
package com.example.appointment.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Optional;

import com.example.appointment.model.Branch;
import com.example.appointment.model.BranchTopic;
import com.example.appointment.model.Topic;
import com.example.appointment.repository.BranchRepository;
import com.example.appointment.repository.BranchTopicRepository;
import com.example.appointment.repository.TopicRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

/**
 * Unit tests for BranchTopicService.
 */
@DataJpaTest
@Import(BranchTopicService.class)
@DisplayName("BranchTopicService Tests")
class BranchTopicServiceTest {

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private BranchTopicRepository branchTopicRepository;

    @Autowired
    private BranchTopicService branchTopicService;

    private Branch testBranch;
    private Topic testTopic;
    private BranchTopic testBranchTopic;

    @BeforeEach
    void setUp() {
        testBranch = new Branch(null, "Test Branch");
        testBranch = branchRepository.save(testBranch);

        testTopic = new Topic(null, "Test Topic");
        testTopic = topicRepository.save(testTopic);

        testBranchTopic = new BranchTopic(null, testBranch, testTopic);
        testBranchTopic = branchTopicRepository.save(testBranchTopic);
    }

    @Test
    @DisplayName("Should find branch topic by ID successfully")
    void testFindById() {
        // Act
        Optional<BranchTopic> found = branchTopicService.findById(testBranchTopic.getId());

        // Assert
        assertNotNull(found);
        assertTrue(found.isPresent());
        assertEquals(testBranchTopic.getId(), found.get().getId());
        assertEquals(testBranch.getId(), found.get().getBranch().getId());
        assertEquals(testTopic.getId(), found.get().getTopic().getId());
    }

    @Test
    @DisplayName("Should find all branch topics successfully")
    void testFindAll() {
        // Act
        List<BranchTopic> found = branchTopicService.findAll();

        // Assert
        assertNotNull(found);
        assertEquals(1, found.size());
    }

    @Test
    @DisplayName("Should find branch topics by branch ID successfully")
    void testFindByBranchId() {
        // Act
        List<BranchTopic> found = branchTopicService.findByBranchId(testBranch.getId());

        // Assert
        assertNotNull(found);
        assertEquals(1, found.size());
        assertEquals(testBranch.getId(), found.get(0).getBranch().getId());
    }

    @Test
    @DisplayName("Should find branch topics by topic ID successfully")
    void testFindByTopicId() {
        // Act
        List<BranchTopic> found = branchTopicService.findByTopicId(testTopic.getId());

        // Assert
        assertNotNull(found);
        assertEquals(1, found.size());
        assertEquals(testTopic.getId(), found.get(0).getTopic().getId());
    }
}