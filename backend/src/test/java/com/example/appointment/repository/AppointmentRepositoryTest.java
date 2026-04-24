// Licensed under the MIT License
package com.example.appointment.repository;

import com.example.appointment.model.Appointment;
import com.example.appointment.model.Branch;
import com.example.appointment.model.BranchTopic;
import com.example.appointment.model.Topic;
import com.example.appointment.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class AppointmentRepositoryTest {

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private BranchTopicRepository branchTopicRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Test
    void save_entity() {
        // given
        Branch branch = branchRepository.save(new Branch(null, "Test Branch"));
        Topic topic = topicRepository.save(new Topic(null, "Test Topic"));
        BranchTopic branchTopic = branchTopicRepository.save(new BranchTopic(null, branch, topic));
        User user = userRepository.save(new User(null, "Test User", "test@example.com"));
        LocalDateTime startTime = LocalDateTime.now();
        Appointment entity = new Appointment(null, user, branchTopic, startTime, "Test Reason");

        // when
        Appointment saved = appointmentRepository.save(entity);

        // then
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getUser().getId()).isEqualTo(user.getId());
        assertThat(saved.getBranchTopic().getId()).isEqualTo(branchTopic.getId());
        assertThat(saved.getStartTime()).isEqualTo(startTime);
        assertThat(saved.getReason()).isEqualTo("Test Reason");
    }

    @Test
    void findById_returns_correct_entity() {
        // given
        Branch branch = branchRepository.save(new Branch(null, "Test Branch"));
        Topic topic = topicRepository.save(new Topic(null, "Test Topic"));
        BranchTopic branchTopic = branchTopicRepository.save(new BranchTopic(null, branch, topic));
        User user = userRepository.save(new User(null, "Test User", "test@example.com"));
        LocalDateTime startTime = LocalDateTime.now();
        Appointment entity = new Appointment(null, user, branchTopic, startTime, "Test Reason");
        Appointment saved = appointmentRepository.save(entity);

        // when
        Optional<Appointment> found = appointmentRepository.findById(saved.getId());

        // then
        assertThat(found).isPresent();
        assertThat(found.get().getReason()).isEqualTo("Test Reason");
    }

    @Test
    void findAll_returns_all_entities() {
        // given
        Branch branch = branchRepository.save(new Branch(null, "Test Branch"));
        Topic topic = topicRepository.save(new Topic(null, "Test Topic"));
        BranchTopic branchTopic = branchTopicRepository.save(new BranchTopic(null, branch, topic));
        User user = userRepository.save(new User(null, "Test User", "test@example.com"));
        LocalDateTime startTime = LocalDateTime.now();
        appointmentRepository.save(new Appointment(null, user, branchTopic, startTime, "Reason1"));
        appointmentRepository.save(new Appointment(null, user, branchTopic, startTime.plusHours(1), "Reason2"));

        // when
        List<Appointment> entities = appointmentRepository.findAll();

        // then
        assertThat(entities).hasSize(2);
    }

    @Test
    void existsByBranchTopicIdAndStartTime_returns_true_when_exists() {
        // given
        Branch branch = branchRepository.save(new Branch(null, "Test Branch"));
        Topic topic = topicRepository.save(new Topic(null, "Test Topic"));
        BranchTopic branchTopic = branchTopicRepository.save(new BranchTopic(null, branch, topic));
        User user = userRepository.save(new User(null, "Test User", "test@example.com"));
        LocalDateTime startTime = LocalDateTime.now();
        appointmentRepository.save(new Appointment(null, user, branchTopic, startTime, "Test Reason"));

        // when
        boolean exists = appointmentRepository.existsByBranchTopicIdAndStartTime(branchTopic.getId(), startTime);

        // then
        assertThat(exists).isTrue();
    }

    @Test
    void findByBranchTopicIdAndStartTime_returns_correct_entity() {
        // given
        Branch branch = branchRepository.save(new Branch(null, "Test Branch"));
        Topic topic = topicRepository.save(new Topic(null, "Test Topic"));
        BranchTopic branchTopic = branchTopicRepository.save(new BranchTopic(null, branch, topic));
        User user = userRepository.save(new User(null, "Test User", "test@example.com"));
        LocalDateTime startTime = LocalDateTime.now();
        Appointment entity = new Appointment(null, user, branchTopic, startTime, "Test Reason");
        appointmentRepository.save(entity);

        // when
        Optional<Appointment> found = appointmentRepository.findByBranchTopicIdAndStartTime(branchTopic.getId(),
                startTime);

        // then
        assertThat(found).isPresent();
        assertThat(found.get().getReason()).isEqualTo("Test Reason");
    }

    @Test
    void findByUserId_returns_matching_entities() {
        // given
        Branch branch = branchRepository.save(new Branch(null, "Test Branch"));
        Topic topic = topicRepository.save(new Topic(null, "Test Topic"));
        BranchTopic branchTopic = branchTopicRepository.save(new BranchTopic(null, branch, topic));
        User user1 = userRepository.save(new User(null, "User1", "user1@example.com"));
        User user2 = userRepository.save(new User(null, "User2", "user2@example.com"));
        LocalDateTime startTime = LocalDateTime.now();
        appointmentRepository.save(new Appointment(null, user1, branchTopic, startTime, "Reason1"));
        appointmentRepository.save(new Appointment(null, user2, branchTopic, startTime.plusHours(1), "Reason2"));
        appointmentRepository.save(new Appointment(null, user1, branchTopic, startTime.plusHours(2), "Reason3"));

        // when
        List<Appointment> found = appointmentRepository.findByUserId(user1.getId());

        // then
        assertThat(found).hasSize(2);
        assertThat(found.get(0).getUser().getId()).isEqualTo(user1.getId());
    }

    // Add more tests for custom methods
}