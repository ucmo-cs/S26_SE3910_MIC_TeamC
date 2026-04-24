// Licensed under the MIT License
package com.example.appointment.controller;

import com.example.appointment.model.Branch;
import com.example.appointment.model.BranchTopic;
import com.example.appointment.model.Topic;
import com.example.appointment.service.BranchService;
import com.example.appointment.service.BranchTopicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for branches.
 */
@RestController
@RequestMapping("/api/branches")
public class BranchController {

    private final BranchService branchService;
    private final BranchTopicService branchTopicService;

    public BranchController(BranchService branchService, BranchTopicService branchTopicService) {
        this.branchService = branchService;
        this.branchTopicService = branchTopicService;
    }

    @PostMapping
    public ResponseEntity<Branch> create(@RequestBody Branch branch) {
        Branch saved = branchService.create(branch);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Branch> getById(@PathVariable Long id) {
        return branchService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Branch>> getAll() {
        List<Branch> branches = branchService.findAll();
        return ResponseEntity.ok(branches);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Branch> update(@PathVariable Long id, @RequestBody Branch branch) {
        branch.setId(id);
        Branch updated = branchService.update(branch);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        branchService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{branchId}/topics")
    public ResponseEntity<List<Topic>> getTopicsForBranch(@PathVariable Long branchId) {
        branchService.findById(branchId).orElseThrow(() -> new IllegalArgumentException("Branch not found"));

        List<Topic> topics = branchTopicService.findByBranchId(branchId).stream().map(bt -> bt.getTopic()).toList();
        return ResponseEntity.ok(topics);
    }

    @GetMapping("/{branchId}/branch-topics")
    public ResponseEntity<List<BranchTopic>> getBranchTopicsForBranch(@PathVariable Long branchId) {
        branchService.findById(branchId).orElseThrow(() -> new IllegalArgumentException("Branch not found"));
        List<BranchTopic> branchTopics = branchTopicService.findByBranchId(branchId);
        return ResponseEntity.ok(branchTopics);
    }
}