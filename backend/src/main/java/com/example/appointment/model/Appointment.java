// Licensed under the MIT License
package com.example.appointment.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "appointments")
public class Appointment {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Setter
    @Getter
    @ManyToOne(optional = false)
    @JoinColumn(name = "branch_topic_id", nullable = false)
    private BranchTopic branchTopic;

    @Getter
    @Setter
    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Setter
    @Getter
    @Column(name = "reason", length = 500)
    private String reason;

    @Setter
    @Getter
    @Column(name = "phone_number", length = 10, nullable = false)
    private String phoneNumber;

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
