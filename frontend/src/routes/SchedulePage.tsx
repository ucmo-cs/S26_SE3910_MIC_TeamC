import React, { useState } from "react";
import { Container, Box, Stepper, Step, StepLabel } from "@mui/material";
import { Step1SelectReason } from "../components/Step1SelectReason";
import { Step2SelectLocation } from "../components/Step2SelectLocation";
import { Step3SelectDateTime } from "../components/Step3SelectDateTime";
import { Step4PersonalInfo } from "../components/Step4PersonalInfo";
import { Step5Confirmation } from "../components/Step5Confirmation";

const STEPS = [
  "Reason",
  "Location",
  "Date & Time",
  "Personal Info",
  "Confirmation",
];

export const SchedulePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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
        {currentStep === 0 && <Step1SelectReason onNext={handleNext} />}
        {currentStep === 1 && (
          <Step2SelectLocation onNext={handleNext} onPrev={handlePrev} />
        )}
        {currentStep === 2 && (
          <Step3SelectDateTime onNext={handleNext} onPrev={handlePrev} />
        )}
        {currentStep === 3 && (
          <Step4PersonalInfo onNext={handleNext} onPrev={handlePrev} />
        )}
        {currentStep === 4 && <Step5Confirmation onPrev={handlePrev} />}
      </Box>
    </Container>
  );
};
