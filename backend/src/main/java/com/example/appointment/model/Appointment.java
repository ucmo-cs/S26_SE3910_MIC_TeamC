// Licensed under the MIT License
package com.example.appointment.model;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid")
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "branch_topic_id", nullable = false)
    private BranchTopic branchTopic;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    public Appointment () {
    }

    public UUID getId () {
        return id;
    }

    public void setId (UUID id) {
        this.id = id;
    }

    public User getUser () {
        return user;
    }

    public void setUser (User user) {
        this.user = user;
    }

    public BranchTopic getBranchTopic () {
        return branchTopic;
    }

    public void setBranchTopic (BranchTopic branchTopic) {
        this.branchTopic = branchTopic;
    }

    public LocalDateTime getStartTime () {
        return startTime;
    }

    public void setStartTime (LocalDateTime startTime) {
        this.startTime = startTime;
    }
}
