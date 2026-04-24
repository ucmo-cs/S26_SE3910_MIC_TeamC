// Licensed under the MIT License
package com.example.appointment.service;

import com.example.appointment.model.Appointment;
import com.example.appointment.repository.AppointmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Concrete service for appointment operations. Keep business rules and
 * transaction boundaries in one class.
 */
@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Transactional
    public Appointment create(Appointment appointment) {
        if (appointment == null) {
            throw new IllegalArgumentException("Appointment cannot be null");
        }
        if (appointment.getBranchTopic() == null || appointment.getStartTime() == null) {
            throw new IllegalArgumentException("branchTopic and startTime are required");
        }
        if (appointmentRepository.existsByBranchTopicIdAndStartTime(appointment.getBranchTopic().getId(),
                appointment.getStartTime())) {
            throw new IllegalStateException("Time slot already booked");
        }

        return appointmentRepository.save(appointment);
    }

    @Transactional(readOnly = true)
    public Optional<Appointment> findById(Long id) {
        return appointmentRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    @Transactional
    public Appointment update(Appointment updated) {
        if (updated == null || updated.getId() == null) {
            throw new IllegalArgumentException("Appointment and ID cannot be null");
        }

        Appointment existing = appointmentRepository.findById(updated.getId())
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));

        existing.setUser(updated.getUser());
        existing.setBranchTopic(updated.getBranchTopic());
        existing.setStartTime(updated.getStartTime());
        existing.setReason(updated.getReason());

        return appointmentRepository.save(existing);
    }

    @Transactional
    public void deleteById(Long id) {
        appointmentRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Appointment> findByUserId(Long userId) {
        return appointmentRepository.findByUserId(userId);
    }

    @Transactional(readOnly = true)
    public List<String> getAvailableTimeslots(String branch) {
        throw new UnsupportedOperationException("Implement timeslot lookup in AppointmentService");
    }
}
