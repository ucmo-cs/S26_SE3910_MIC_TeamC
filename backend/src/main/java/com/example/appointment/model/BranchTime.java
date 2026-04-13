// Licensed under the MIT License
package com.example.appointment.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Objects;

@Setter
@Getter
@Entity
@Table(name = "branch_times")
public class BranchTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Enumerated(EnumType.STRING)
    @Column(name = "day_of_week", nullable = false)
    private DayOfWeek dayOfWeek;

    @Column(name = "available_time", nullable = false)
    private LocalTime availableTime;

    public BranchTime() {
    }

    public BranchTime(Long id, Branch branch, DayOfWeek dayOfWeek, LocalTime availableTime) {
        this.id = id;
        this.branch = branch;
        this.dayOfWeek = dayOfWeek;
        this.availableTime = availableTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BranchTime that = (BranchTime) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "BranchTime{" + "id=" + id + ", branch=" + branch +
                ", dayOfWeek=" + dayOfWeek + ", availableTime=" + availableTime + '}';
    }
}