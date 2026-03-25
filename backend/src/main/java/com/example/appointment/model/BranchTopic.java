// Licensed under the MIT License
package com.example.appointment.model;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "branch_topics")
public class BranchTopic {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid")
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(optional = false)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    @OneToMany(mappedBy = "branchTopic", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Appointment> appointments = new HashSet<>();

    public BranchTopic () {
    }

    public UUID getId () {
        return id;
    }

    public void setId (UUID id) {
        this.id = id;
    }

    public Branch getBranch () {
        return branch;
    }

    public void setBranch (Branch branch) {
        this.branch = branch;
    }

    public Topic getTopic () {
        return topic;
    }

    public void setTopic (Topic topic) {
        this.topic = topic;
    }

    public Set<Appointment> getAppointments () {
        return appointments;
    }

    public void setAppointments (Set<Appointment> appointments) {
        this.appointments = appointments;
    }
}
