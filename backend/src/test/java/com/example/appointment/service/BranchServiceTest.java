// Licensed under the MIT License
package com.example.appointment.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Optional;

import com.example.appointment.model.Branch;
import com.example.appointment.repository.BranchRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

/**
 * Unit tests for BranchService.
 */
@DataJpaTest
@Import(BranchService.class)
@DisplayName("BranchService Tests")
class BranchServiceTest {

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private BranchService branchService;

    private Branch testBranch1;
    private Branch testBranch2;

    @BeforeEach
    void setUp() {
        testBranch1 = new Branch(null, "Branch One");
        testBranch1 = branchRepository.save(testBranch1);

        testBranch2 = new Branch(null, "Branch Two");
        testBranch2 = branchRepository.save(testBranch2);
    }

    @Test
    @DisplayName("Should find branch by ID successfully")
    void testFindById() {
        // Act
        Optional<Branch> foundBranch = branchService.findById(testBranch1.getId());

        // Assert
        assertNotNull(foundBranch);
        assertTrue(foundBranch.isPresent());
        assertEquals(testBranch1.getId(), foundBranch.get().getId());
        assertEquals("Branch One", foundBranch.get().getName());
    }

    @Test
    @DisplayName("Should find branch by name successfully")
    void testFindByName() {
        // Act
        List<Branch> foundBranches = branchService.findByName("Branch One");

        // Assert
        assertNotNull(foundBranches);
        assertEquals(1, foundBranches.size());
        assertEquals("Branch One", foundBranches.get(0).getName());
    }

    @Test
    @DisplayName("Should return empty when branch by name not found")
    void testFindByNameNotFound() {
        // Act
        List<Branch> foundBranches = branchService.findByName("Nonexistent");

        // Assert
        assertNotNull(foundBranches);
        assertEquals(0, foundBranches.size());
    }

    @Test
    @DisplayName("Should find all branches successfully")
    void testFindAll() {
        // Act
        List<Branch> foundBranches = branchService.findAll();

        // Assert
        assertNotNull(foundBranches);
        assertEquals(2, foundBranches.size());
        assertEquals("Branch One", foundBranches.get(0).getName());
        assertEquals("Branch Two", foundBranches.get(1).getName());
    }
}