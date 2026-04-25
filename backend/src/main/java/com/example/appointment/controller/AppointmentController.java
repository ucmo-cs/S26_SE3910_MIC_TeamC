// Licensed under the MIT License
package com.example.appointment.controller;

import com.example.appointment.model.Appointment;
import com.example.appointment.model.User;
import com.example.appointment.repository.UserRepository;
import com.example.appointment.service.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * REST controller responsible for appointment-related CRUD endpoints.
 */
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final UserRepository userRepository;

    public AppointmentController(AppointmentService appointmentService, UserRepository userRepository) {
        this.appointmentService = appointmentService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<Appointment> create(@RequestBody Appointment appointment) {
        Appointment saved = appointmentService.create(appointment);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getById(@PathVariable Long id) {
        return appointmentService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAll() {
        return ResponseEntity.ok(appointmentService.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> update(@PathVariable Long id, @RequestBody Appointment appointment) {
        appointment.setId(id);
        Appointment updated = appointmentService.update(appointment);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        appointmentService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/taken-slots")
    public ResponseEntity<List<String>> getTakenSlots(@RequestParam String date) {
        LocalDate localDate = LocalDate.parse(date);
        List<Appointment> allAppointments = appointmentService.findAll();
        List<String> takenSlots = allAppointments.stream()
                .filter(apt -> apt.getStartTime() != null &&
                        apt.getStartTime().toLocalDate().equals(localDate))
                .map(apt -> apt.getStartTime().format(DateTimeFormatter.ofPattern("HH:mm")))
                .collect(Collectors.toList());
        return ResponseEntity.ok(takenSlots);
    }
}