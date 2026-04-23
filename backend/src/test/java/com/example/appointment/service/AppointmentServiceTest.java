// Licensed under the MIT License
package com.example.appointment.service;

import com.example.appointment.model.Appointment;
import com.example.appointment.model.Branch;
import com.example.appointment.model.BranchTopic;
import com.example.appointment.model.Topic;
import com.example.appointment.model.User;
import com.example.appointment.repository.AppointmentRepository;
import com.example.appointment.repository.BranchRepository;
import com.example.appointment.repository.BranchTopicRepository;
import com.example.appointment.repository.TopicRepository;
import com.example.appointment.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DataJpaTest
@Import(AppointmentService.class)
@DisplayName("AppointmentService (CRUD) Tests")
class AppointmentServiceTest {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private BranchTopicRepository branchTopicRepository;

    @Autowired
    private UserRepository userRepository;

    private User testUser;
    private BranchTopic testBranchTopic;
    private Appointment appointment;

    @BeforeEach
    void setUp() {
        Branch branch = branchRepository.save(new Branch(null, "Test Branch"));
        Topic topic = topicRepository.save(new Topic(null, "Test Topic"));
        testBranchTopic = branchTopicRepository.save(new BranchTopic(null, branch, topic));
        testUser = userRepository.save(new User("Test User", "testuser", "test@example.com", "hashedpassword"));

        appointment = new Appointment();
        appointment.setUser(testUser);
        appointment.setBranchTopic(testBranchTopic);
        appointment.setStartTime(LocalDateTime.parse("2023-10-01T10:00:00"));
        appointment.setReason("Test reason");
    }

    @Test
    void create_and_find_by_id() {
        Appointment saved = appointmentService.create(appointment);

        assertThat(saved.getId()).isNotNull();

        Appointment found = appointmentService.findById(saved.getId()).orElseThrow();
        assertThat(found.getUser().getId()).isEqualTo(appointment.getUser().getId());
        assertThat(found.getBranchTopic().getId()).isEqualTo(appointment.getBranchTopic().getId());
    }

    @Test
    void find_all_returns_list() {
        appointmentService.create(appointment);
        List<Appointment> appointments = appointmentService.findAll();

        assertThat(appointments).hasSize(1);
    }

    @Test
    void duplicate_timeslot_is_rejected() {
        appointmentService.create(appointment);

        User secondUser = userRepository.save(new User("Second User", "seconduser", "second@example.com", "hashedpassword"));
        Appointment second = new Appointment();
        second.setUser(secondUser);
        second.setBranchTopic(testBranchTopic);
        second.setStartTime(appointment.getStartTime());

        IllegalStateException ex = assertThrows(IllegalStateException.class, () -> appointmentService.create(second));
        assertThat(ex.getMessage()).isEqualTo("Time slot already booked");
    }

    @Test
    void update_appointment() {
        Appointment saved = appointmentService.create(appointment);

        Appointment updateRequest = new Appointment();
        updateRequest.setId(saved.getId());
        updateRequest.setUser(testUser);
        updateRequest.setBranchTopic(testBranchTopic);
        updateRequest.setStartTime(LocalDateTime.parse("2023-10-01T11:00:00"));
        updateRequest.setReason("Updated reason");

        Appointment updated = appointmentService.update(updateRequest);

        assertThat(updated.getStartTime()).isEqualTo(LocalDateTime.parse("2023-10-01T11:00:00"));
        assertThat(updated.getReason()).isEqualTo("Updated reason");
    }

    @Test
    void delete_by_id() {
        Appointment saved = appointmentService.create(appointment);

        appointmentService.deleteById(saved.getId());
        assertThat(appointmentService.findById(saved.getId())).isEmpty();
    }
}
