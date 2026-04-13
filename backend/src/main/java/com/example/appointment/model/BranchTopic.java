// Licensed under the MIT License
package com.example.appointment.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "branch_topics")
public class BranchTopic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(optional = false)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    @JsonIgnore
    @OneToMany(mappedBy = "branchTopic", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Appointment> appointments = new HashSet<>();

    public BranchTopic() {
    }

    public BranchTopic(Long id, Branch branch, Topic topic) {
        this.id = id;
        this.branch = branch;
        this.topic = topic;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Branch getBranch() {
        return branch;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public Set<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(Set<Appointment> appointments) {
        this.appointments = appointments;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        BranchTopic that = (BranchTopic) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "BranchTopic{" + "id=" + id + ", branch=" + branch + ", topic=" + topic + '}';
    }
}
