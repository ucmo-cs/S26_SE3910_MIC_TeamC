// Licensed under the MIT License
package com.example.appointment.controller;

import com.example.appointment.model.BranchTopic;
import com.example.appointment.service.BranchTopicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for branch topics.
 */
@RestController
@RequestMapping("/api/branchtopics")
public class BranchTopicController {

    private final BranchTopicService branchTopicService;

    public BranchTopicController(BranchTopicService branchTopicService) {
        this.branchTopicService = branchTopicService;
    }

    @PostMapping
    public ResponseEntity<BranchTopic> create(@RequestBody BranchTopic branchTopic) {
        BranchTopic saved = branchTopicService.create(branchTopic);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BranchTopic> getById(@PathVariable Long id) {
        return branchTopicService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<BranchTopic>> getAll() {
        List<BranchTopic> branchTopics = branchTopicService.findAll();
        return ResponseEntity.ok(branchTopics);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BranchTopic> update(@PathVariable Long id, @RequestBody BranchTopic branchTopic) {
        branchTopic.setId(id);
        BranchTopic updated = branchTopicService.update(branchTopic);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        branchTopicService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}