// Licensed under the MIT License
package com.example.appointment.dto;

import java.util.UUID;

/**
 * DTO returned after a successful booking. Use UUID for ids to match entities.
 */
public class AppointmentResponse {
    private Long id;
    private UUID userId;
    private UUID branchTopicId;
    private String startTime; // ISO-8601
    private String message;

    public AppointmentResponse() {
    }

    public AppointmentResponse(Long id, UUID userId, UUID branchTopicId, String startTime, String message) {
        this.id = id;
        this.userId = userId;
        this.branchTopicId = branchTopicId;
        this.startTime = startTime;
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getBranchTopicId() {
        return branchTopicId;
    }

    public void setBranchTopicId(UUID branchTopicId) {
        this.branchTopicId = branchTopicId;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
