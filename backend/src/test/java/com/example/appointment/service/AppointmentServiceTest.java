// Licensed under the MIT License
package com.example.appointment.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.UUID;

import com.example.appointment.dto.AppointmentRequest;
import com.example.appointment.dto.AppointmentResponse;
import com.example.appointment.dto.CreateAppointmentRequest;
import com.example.appointment.model.Appointment;
import com.example.appointment.model.Branch;
import com.example.appointment.model.BranchTopic;
import com.example.appointment.model.Topic;
import com.example.appointment.model.User;
import com.example.appointment.repository.BranchRepository;
import com.example.appointment.repository.BranchTopicRepository;
import com.example.appointment.repository.TopicRepository;
import com.example.appointment.service.impl.AppointmentServiceImpl;
import com.example.appointment.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

/**
 * Unit tests for AppointmentService.
 */
@DataJpaTest
@Import({
        AppointmentServiceImpl.class,
        UserServiceImpl.class})
@DisplayName("AppointmentService Tests")
class AppointmentServiceTest {

    @Autowired
    private BranchTopicRepository branchTopicRepository;
    @Autowired
    private BranchRepository branchRepository;
    @Autowired
    private TopicRepository topicRepository;
    @Autowired
    private com.example.appointment.service.UserService userService;
    @Autowired
    private AppointmentService appointmentService;

    private User testUser;
    private BranchTopic testBranchTopic;
    private Appointment testAppointment;
    private CreateAppointmentRequest testCreateRequest;
    private AppointmentRequest testLegacyRequest;

    @BeforeEach
    void setUp () {
        // Create and save Branch
        Branch branch = new Branch();
        branch.setName("Test Branch");
        branchRepository.save(branch);

        // Create and save Topic
        Topic topic = new Topic();
        topic.setName("Test Topic");
        topicRepository.save(topic);

        // Create and save BranchTopic
        testBranchTopic = new BranchTopic();
        testBranchTopic.setBranch(branch);
        testBranchTopic.setTopic(topic);
        branchTopicRepository.save(testBranchTopic);

        // Create and save User
        testUser = userService.findOrCreate("John Doe", "john@example.com");

        testAppointment = new Appointment();
        testAppointment.setId(UUID.fromString("00000000-0000-0000-0000-000000000003"));
        testAppointment.setUser(testUser);
        testAppointment.setBranchTopic(testBranchTopic);
        testAppointment.setStartTime(java.time.LocalDateTime.parse("2023-10-01T10:00:00"));

        testCreateRequest = new CreateAppointmentRequest();
        testCreateRequest.setUserId(testUser.getId());
        testCreateRequest.setBranchTopicId(testBranchTopic.getId());
        testCreateRequest.setStartTime("2023-10-01T10:00:00");
        testCreateRequest.setReason("Test reason");

        testLegacyRequest = new AppointmentRequest();
        testLegacyRequest.setName("John Doe");
        testLegacyRequest.setEmail("john@example.com");
        testLegacyRequest.setBranch(testBranchTopic.getId().toString());
        testLegacyRequest.setTimeslot("2023-10-01T10:00:00");
        testLegacyRequest.setReason("Test reason");
    }

    @Test
    @DisplayName("Should book appointment successfully with CreateAppointmentRequest")
    void testBookAppointmentWithCreateRequest () {
        // Act
        AppointmentResponse response = appointmentService.bookAppointment(testCreateRequest);

        // Assert
        assertNotNull(response);
        assertNotNull(response.getId());
        assertEquals(testUser.getId(), response.getUserId());
        assertEquals(testBranchTopic.getId(), response.getBranchTopicId());
        assertEquals("2023-10-01T10:00", response.getStartTime());
        assertEquals("Booked", response.getMessage());
    }

    @Test
    @DisplayName("Should book appointment successfully with legacy AppointmentRequest")
    void testBookAppointmentWithLegacyRequest () {
        // Act
        AppointmentResponse response = appointmentService.bookAppointment(testLegacyRequest);

        // Assert
        assertNotNull(response);
        assertNotNull(response.getId());
    }

    @Test
    @DisplayName("Should throw exception when timeslot is already booked")
    void testBookAppointmentTimeslotUnavailable () {
        // First, book the appointment
        appointmentService.bookAppointment(testCreateRequest);

        // Now, try to book again
        // Act & Assert
        IllegalStateException exception = assertThrows(IllegalStateException.class, () -> {
            appointmentService.bookAppointment(testCreateRequest);
        });
        assertEquals("Time slot already booked", exception.getMessage());
    }

    @Test
    @DisplayName("Should throw exception for getAvailableTimeslots")
    void testGetAvailableTimeslots () {
        // Act & Assert
        UnsupportedOperationException exception = assertThrows(UnsupportedOperationException.class, () -> {
            appointmentService.getAvailableTimeslots("test");
        });
        assertEquals("Implement timeslot lookup in AppointmentServiceImpl", exception.getMessage());
    }
}
