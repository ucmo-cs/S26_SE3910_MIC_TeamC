// Licensed under the MIT License
package com.example.appointment.controller;

import com.example.appointment.model.BranchTime;
import com.example.appointment.service.BranchTimeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

/**
 * REST controller for branch times.
 * Supports filtering by branchId and/or day of week.
 *
 * Examples:
 *   GET /api/branchtimes                          — all records
 *   GET /api/branchtimes?branchId=1               — all times for branch 1
 *   GET /api/branchtimes?day=MONDAY               — all times on Mondays
 *   GET /api/branchtimes?branchId=1&day=MONDAY    — times for branch 1 on Mondays
 *   GET /api/branchtimes?branchId=1&date=2026-04-14 — times for branch 1 on the day-of-week of that date
 */
@RestController
@RequestMapping("/api/branchtimes")
@CrossOrigin(origins = "http://localhost:5173")
public class BranchTimeController {

    private final BranchTimeService branchTimeService;

    public BranchTimeController(BranchTimeService branchTimeService) {
        this.branchTimeService = branchTimeService;
    }

    @PostMapping
    public ResponseEntity<BranchTime> create(@RequestBody BranchTime branchTime) {
        BranchTime saved = branchTimeService.create(branchTime);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BranchTime> getById(@PathVariable Long id) {
        return branchTimeService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<BranchTime>> getAll(
            @RequestParam(required = false) Long branchId,
            @RequestParam(required = false) DayOfWeek day,
            @RequestParam(required = false) String date) {

        // If a calendar date is provided, derive the day of week from it
        if (date != null && day == null) {
            day = LocalDate.parse(date).getDayOfWeek();
        }

        if (branchId != null && day != null) {
            return ResponseEntity.ok(branchTimeService.findByBranchIdAndDayOfWeek(branchId, day));
        } else if (branchId != null) {
            return ResponseEntity.ok(branchTimeService.findByBranchId(branchId));
        } else if (day != null) {
            return ResponseEntity.ok(branchTimeService.findByDayOfWeek(day));
        }

        return ResponseEntity.ok(branchTimeService.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BranchTime> update(@PathVariable Long id, @RequestBody BranchTime branchTime) {
        branchTime.setId(id);
        BranchTime updated = branchTimeService.update(branchTime);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        branchTimeService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}