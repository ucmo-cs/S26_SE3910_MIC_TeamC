// Licensed under the MIT License
package com.example.appointment.repository;

import com.example.appointment.model.BranchTopic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BranchTopicRepository extends JpaRepository<BranchTopic, Long> {

    List<BranchTopic> findByBranchId(Long branchId);

    List<BranchTopic> findByTopicId(Long topicId);
}
