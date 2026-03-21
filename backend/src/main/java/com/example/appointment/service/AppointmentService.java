// Licensed under the MIT License
package com.example.appointment.service;

import com.example.appointment.dto.AppointmentRequest;
import com.example.appointment.dto.AppointmentResponse;
import com.example.appointment.dto.CreateAppointmentRequest;

import java.util.List;

/**
 * Service interface that declares business operations related to appointments.
 * Keep business rules and transaction boundaries in the service layer.
 */
public interface AppointmentService {
    // Backwards-compatible API used by controller scaffold
    AppointmentResponse bookAppointment (AppointmentRequest request);

    // New, entity-based API used by service clients
    AppointmentResponse bookAppointment (CreateAppointmentRequest request);

    List<String> getAvailableTimeslots (String branch);
}
