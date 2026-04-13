// Licensed under the MIT License
package com.example.appointment.repository;

import com.example.appointment.model.BranchTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.util.List;

@Repository
public interface BranchTimeRepository extends JpaRepository<BranchTime, Long> {

    List<BranchTime> findByBranchId(Long branchId);

    List<BranchTime> findByDayOfWeek(DayOfWeek dayOfWeek);

    List<BranchTime> findByBranchIdAndDayOfWeek(Long branchId, DayOfWeek dayOfWeek);
}