import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Button,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useAppointment } from "../context/AppointmentContext";
import type { AppointmentFormData } from "../types";

interface Step5Props {
  onPrev: () => void;
}

export const Step5Confirmation: React.FC<Step5Props> = ({ onPrev }) => {
  const navigate = useNavigate();
  const { formData, saveAppointment } = useAppointment();

  const handleSave = () => {
    saveAppointment(formData as AppointmentFormData);
    navigate({ to: "/appointments" });
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto", marginTop: 4 }}>
      <CardHeader title="Step 5: Confirmation" />
      <CardContent>
        <Stack spacing={2}>
          <Paper
            sx={{
              padding: 2,
              backgroundColor: "#f5f5f5",
            }}
          >
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Appointment Reason
              </Typography>
              <Typography variant="body1">{formData.reason}</Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Location
              </Typography>
              <Typography variant="body1">{formData.location}</Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Date & Time
              </Typography>
              <Typography variant="body1">
                {formData.date} at {formData.time}
              </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Full Name
              </Typography>
              <Typography variant="body1">{formData.name}</Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Email
              </Typography>
              <Typography variant="body1">{formData.email}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Phone Number
              </Typography>
              <Typography variant="body1">{formData.phone}</Typography>
            </Box>
          </Paper>
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
            }}
          >
            <Button variant="outlined" onClick={onPrev}>
              Back
            </Button>
            <Button variant="contained" color="success" onClick={handleSave}>
              Save Appointment
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
