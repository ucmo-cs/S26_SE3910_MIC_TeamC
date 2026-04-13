// Step5Confirmation.tsx
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
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useAppointment } from "../context/AppointmentContext";

dayjs.extend(advancedFormat);

interface Step5Props {
  onPrev: () => void;
  onConfirm: () => void;
}

const formatDateTime = (date: string, time: string): string => {
  if (!date || !time) return "N/A";
  return dayjs(`${date}T${time}`).format("dddd, MMMM Do - h:mm A");
};

const formatPhone = (phone: string): string => {
  if (!phone) return "N/A";
  const digits = phone.replace(/\D/g, "");
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export const Step5Confirmation: React.FC<Step5Props> = ({ onPrev, onConfirm }) => {
  const { formData } = useAppointment();

  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto", marginTop: 4 }}>
    <CardHeader title="Step 5: Confirmation" />
    <CardContent>
    <Stack spacing={2}>
    <Paper sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
    <Box sx={{ marginBottom: 2 }}>
    <Typography variant="subtitle2" color="textSecondary">
    Appointment Reason
    </Typography>
    <Typography variant="body1">{formData.reason || "N/A"}</Typography>
    </Box>
    <Box sx={{ marginBottom: 2 }}>
    <Typography variant="subtitle2" color="textSecondary">
    Location
    </Typography>
    <Typography variant="body1">{formData.branchName}</Typography>
    </Box>
    <Box sx={{ marginBottom: 2 }}>
    <Typography variant="subtitle2" color="textSecondary">
    Branch Topic
    </Typography>
    <Typography variant="body1">{formData.branchTopicName}</Typography>
    </Box>
    <Box sx={{ marginBottom: 2 }}>
    <Typography variant="subtitle2" color="textSecondary">
    Date & Time
    </Typography>
    <Typography variant="body1">
    {formatDateTime(formData.date, formData.time)}
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
    <Typography variant="body1">{formatPhone(formData.phone)}</Typography>
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
    <Button variant="contained" color="success" onClick={onConfirm}>
    Save Appointment
    </Button>
    </Box>
    </Stack>
    </CardContent>
    </Card>
  );
};
