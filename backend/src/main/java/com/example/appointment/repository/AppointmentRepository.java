// Licensed under the MIT License
package com.example.appointment.repository;

import com.example.appointment.model.Appointment;
import com.example.appointment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {
    boolean existsByBranchTopicIdAndStartTime (UUID branchTopicId, LocalDateTime startTime);

    Optional<Appointment> findByBranchTopicIdAndStartTime (UUID branchTopicId, LocalDateTime startTime);

    List<Appointment> findByUserId (UUID userId);

    List<Appointment> findByUser (User user);
}
