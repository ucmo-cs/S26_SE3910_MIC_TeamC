import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Container, Box, Stepper, Step, StepLabel } from "@mui/material";
import { Step1SelectLocation } from "../components/Step1SelectLocation";
import { Step2SelectReason } from "../components/Step2SelectReason";
import { Step3SelectDateTime } from "../components/Step3SelectDateTime";
import { Step4PersonalInfo } from "../components/Step4PersonalInfo";
import { Step5Confirmation } from "../components/Step5Confirmation";
import { useAppointment } from "../context/AppointmentContext";

const STEPS = ["Location", "Reason", "Date & Time", "Personal Info", "Confirmation"];

export const SchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const { formData, updateFormData } = useAppointment();

  const API_BASE = "http://localhost:8080/api";

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

    const handlePrev = () => {
      if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

      const saveAppointment = async () => {
        try {
          if (!formData.startTime) {
            throw new Error("Please select a valid date and time.");
          }

          const userRes = await fetch(`${API_BASE}/users/find-or-create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
            }),
          });

          if (!userRes.ok) {
            const errText = await userRes.text();
            throw new Error("Failed to create/find user: " + errText);
          }

          const userData = await userRes.json();
          const userId = userData.id;

          const appointmentPayload = {
            reason: formData.reason || "",
            startTime: formData.startTime,
            branchTopic: { id: formData.branchTopicId },
            user: { id: userId },
            phoneNumber: formData.phone,
          };

          const appointmentRes = await fetch(`${API_BASE}/appointments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointmentPayload),
          });

          if (!appointmentRes.ok) {
            const errText = await appointmentRes.text();
            throw new Error("Failed to save appointment: " + errText);
          }

          navigate({ to: "/appointments" });
        } catch (err: any) {
          console.error(err);
          alert(err.message || "Something went wrong while saving the appointment.");
        }
      };

      return (
        <Container maxWidth="md">
        <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Stepper activeStep={currentStep}>
        {STEPS.map((label) => (
          <Step key={label}>
          <StepLabel>{label}</StepLabel>
          </Step>
        ))}
        </Stepper>
        </Box>

        <Box sx={{ marginBottom: 4 }}>
        {currentStep === 0 && (
          <Step1SelectLocation
          onNext={handleNext}
          onPrev={handlePrev}
          onDataChange={updateFormData}
          value={formData.branchId}
          />
        )}

        {currentStep === 1 && (
          <Step2SelectReason
          onNext={handleNext}
          onPrev={handlePrev}
          onDataChange={updateFormData}
          branchId={formData.branchId}
          value={formData.branchTopicId}
          />
        )}

        {currentStep === 2 && (
          <Step3SelectDateTime
          onNext={handleNext}
          onPrev={handlePrev}
          onDataChange={updateFormData}
          />
        )}

        {currentStep === 3 && (
          <Step4PersonalInfo onNext={handleNext} onPrev={handlePrev} />
        )}

        {currentStep === 4 && (
          <Step5Confirmation onPrev={handlePrev} onConfirm={saveAppointment} />
        )}
        </Box>
        </Container>
      );
};
