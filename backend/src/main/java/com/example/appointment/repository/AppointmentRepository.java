// Licensed under the MIT License
package com.example.appointment.repository;

import com.example.appointment.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    boolean existsByBranchTopicIdAndStartTime(Long branchTopicId, LocalDateTime startTime);

    Optional<Appointment> findByBranchTopicIdAndStartTime(Long branchTopicId, LocalDateTime startTime);

    List<Appointment> findByUserId(Long userId);
}
