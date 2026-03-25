// Licensed under the MIT License
package com.example.appointment.controller;

import com.example.appointment.dto.AppointmentResponse;
import com.example.appointment.dto.CreateAppointmentRequest;
import com.example.appointment.service.AppointmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

/**
 * REST controller responsible for appointment-related endpoints. Keep
 * controllers thin: validate input, call services, and map errors to HTTP
 * statuses.
 */
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController (AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    public ResponseEntity<AppointmentResponse> bookAppointment (@Valid @RequestBody CreateAppointmentRequest request) {
        try {
            AppointmentResponse response = appointmentService.bookAppointment(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    @GetMapping("/available")
    public ResponseEntity<List<String>> getAvailableTimeslots (@RequestParam UUID branchTopicId,
            @RequestParam String date) {
        // TODO: Implement available timeslot logic for given branchTopicId and date.
        // For now, return empty list.
        return ResponseEntity.ok(List.of());
    }
}
