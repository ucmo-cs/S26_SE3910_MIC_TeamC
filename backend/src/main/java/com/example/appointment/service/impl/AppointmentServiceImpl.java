// Licensed under the MIT License
package com.example.appointment.service.impl;

import com.example.appointment.dto.AppointmentRequest;
import com.example.appointment.dto.AppointmentResponse;
import com.example.appointment.dto.CreateAppointmentRequest;
import com.example.appointment.model.Appointment;
import com.example.appointment.model.BranchTopic;
import com.example.appointment.model.User;
import com.example.appointment.repository.AppointmentRepository;
import com.example.appointment.repository.BranchTopicRepository;
import com.example.appointment.service.AppointmentService;
import com.example.appointment.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.UUID;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final BranchTopicRepository branchTopicRepository;
    private final UserService userService;

    public AppointmentServiceImpl (AppointmentRepository appointmentRepository,
            BranchTopicRepository branchTopicRepository, UserService userService) {
        this.appointmentRepository = appointmentRepository;
        this.branchTopicRepository = branchTopicRepository;
        this.userService = userService;
    }

    @Override
    @Transactional
    public AppointmentResponse bookAppointment (AppointmentRequest request) {
        // Maintain backward compatibility: map legacy AppointmentRequest to
        // CreateAppointmentRequest
        // This simplistic mapping assumes `branch` contains a UUID string of
        // BranchTopic in legacy requests.
        UUID branchTopicId;
        try {
            branchTopicId = UUID.fromString(request.getBranch());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Legacy request 'branch' must be a BranchTopic UUID");
        }

        CreateAppointmentRequest r = new CreateAppointmentRequest();
        // create or find user
        User user = userService.findOrCreate(request.getName(), request.getEmail());
        r.setUserId(user.getId());
        r.setBranchTopicId(branchTopicId);
        r.setStartTime(request.getTimeslot());
        r.setReason(request.getReason());
        return bookAppointment(r);
    }

    @Override
    @Transactional
    public AppointmentResponse bookAppointment (CreateAppointmentRequest request) {
        LocalDateTime start;
        try {
            start = LocalDateTime.parse(request.getStartTime());
        } catch (DateTimeParseException ex) {
            throw new IllegalArgumentException("startTime must be ISO-8601 local date-time", ex);
        }

        UUID branchTopicId = request.getBranchTopicId();

        BranchTopic bt = branchTopicRepository.findById(branchTopicId)
                .orElseThrow( () -> new IllegalArgumentException("branchTopic not found"));

        boolean exists = appointmentRepository.existsByBranchTopicIdAndStartTime(branchTopicId, start);
        if (exists) {
            throw new IllegalStateException("Time slot already booked");
        }

        User user = userService.findById(request.getUserId())
                .orElseThrow( () -> new IllegalArgumentException("user not found"));

        Appointment a = new Appointment();
        a.setUser(user);
        a.setBranchTopic(bt);
        a.setStartTime(start);

        Appointment saved = appointmentRepository.save(a);

        return new AppointmentResponse(saved.getId(), user.getId(), bt.getId(), saved.getStartTime().toString(),
                "Booked");
    }

    @Override
    public List<String> getAvailableTimeslots (String branch) {
        // Simple placeholder: real implementation should compute open slots.
        throw new UnsupportedOperationException("Implement timeslot lookup in AppointmentServiceImpl");
    }
}
