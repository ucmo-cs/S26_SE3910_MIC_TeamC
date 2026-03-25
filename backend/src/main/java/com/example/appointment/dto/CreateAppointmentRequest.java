// Licensed under the MIT License
package com.example.appointment.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

/**
 * DTO for creating an appointment. Keep fields typed to avoid exposing
 * entities.
 */
public class CreateAppointmentRequest {

    @NotNull
    private UUID userId;

    @NotNull
    private UUID branchTopicId;

    @NotNull
    private String startTime; // ISO-8601

    @Size(max = 500)
    private String reason;

    public CreateAppointmentRequest () {
    }

    public UUID getUserId () {
        return userId;
    }

    public void setUserId (UUID userId) {
        this.userId = userId;
    }

    public UUID getBranchTopicId () {
        return branchTopicId;
    }

    public void setBranchTopicId (UUID branchTopicId) {
        this.branchTopicId = branchTopicId;
    }

    public String getStartTime () {
        return startTime;
    }

    public void setStartTime (String startTime) {
        this.startTime = startTime;
    }

    public String getReason () {
        return reason;
    }

    public void setReason (String reason) {
        this.reason = reason;
    }
}
