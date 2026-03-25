// Licensed under the MIT License
package com.example.appointment.controller;

import com.example.appointment.dto.BranchResponse;
import com.example.appointment.dto.TopicResponse;
import com.example.appointment.repository.BranchTopicRepository;
import com.example.appointment.service.BranchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * REST controller for branch and branch-topic queries.
 */
@RestController
@RequestMapping("/api/branches")
public class BranchController {

    private final BranchService branchService;
    private final BranchTopicRepository branchTopicRepository;

    public BranchController (BranchService branchService, BranchTopicRepository branchTopicRepository) {
        this.branchService = branchService;
        this.branchTopicRepository = branchTopicRepository;
    }

    @GetMapping
    public ResponseEntity<List<BranchResponse>> getAllBranches () {
        List<BranchResponse> branches = branchService.findAll().stream()
                .map(b -> new BranchResponse(b.getId(), b.getName())).toList();
        return ResponseEntity.ok(branches);
    }

    @GetMapping("/{branchId}/topics")
    public ResponseEntity<List<TopicResponse>> getTopicsForBranch (@PathVariable UUID branchId) {
        branchService.findById(branchId).orElseThrow( () -> new IllegalArgumentException("Branch not found"));

        List<TopicResponse> topics = branchTopicRepository.findAll().stream()
                .filter(bt -> bt.getBranch().getId().equals(branchId))
                .map(bt -> new TopicResponse(bt.getTopic().getId(), bt.getTopic().getName())).toList();
        return ResponseEntity.ok(topics);
    }
}
