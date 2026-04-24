// Licensed under the MIT License
package com.example.appointment.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "branch_topic_id", nullable = false)
    private BranchTopic branchTopic;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "reason", length = 500)
    private String reason;

    public Appointment() {
    }

    public Appointment(Long id, User user, BranchTopic branchTopic, LocalDateTime startTime, String reason) {
        this.id = id;
        this.user = user;
        this.branchTopic = branchTopic;
        this.startTime = startTime;
        this.reason = reason;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BranchTopic getBranchTopic() {
        return branchTopic;
    }

    public void setBranchTopic(BranchTopic branchTopic) {
        this.branchTopic = branchTopic;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if ( ! (o instanceof Appointment))
            return false;
        Appointment that = (Appointment) o;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Appointment{" + "id=" + id + ", user=" + user + ", branchTopic=" + branchTopic + ", startTime="
                + startTime + ", reason='" + reason + '\'' + '}';
    }
}
