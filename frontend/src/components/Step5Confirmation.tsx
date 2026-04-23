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
  Divider,
  Chip,
} from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
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
  if (digits.length !== 10) return phone;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export const Step5Confirmation: React.FC<Step5Props> = ({ onPrev, onConfirm }) => {
  const { formData } = useAppointment();

  const detailCardStyle = {
    p: 2.25,
    borderRadius: 3,
    border: "1px solid #E2E8F0",
    backgroundColor: "#FFFFFF",
    height: "100%",
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.04)",
  };

  return (
    <Card
    sx={{
      maxWidth: 860,
      mx: "auto",
      mt: 4,
      borderRadius: 4,
      border: "1px solid #E5E7EB",
      boxShadow: "0 14px 36px rgba(15, 23, 42, 0.08)",
          overflow: "hidden",
    }}
    >
    <CardHeader
    title={
      <Box>
      <Typography
      variant="h5"
      sx={{
        fontWeight: 800,
        color: "#0F172A",
        mb: 0.75,
        fontSize: { xs: "1.35rem", sm: "1.65rem" },
      }}
      >
      Step 5: Confirm Appointment Details
      </Typography>
      <Typography
      variant="body2"
      sx={{ color: "#64748B", fontSize: "0.98rem" }}
      >
      Review all appointment details before saving your booking.
      </Typography>
      </Box>
    }
    sx={{
      pb: 1,
      pt: 4,
      px: { xs: 3, sm: 4 },
      background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
    }}
    />

    <Divider />

    <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
    <Stack spacing={3}>
    {/* Ready banner */}
    <Paper
    variant="outlined"
    sx={{
      p: { xs: 2, sm: 2.5 },
      borderRadius: 3,
      borderColor: "#DBEAFE",
      background: "linear-gradient(180deg, #F8FBFF 0%, #F1F7FF 100%)",
    }}
    >
    <Stack
    direction={{ xs: "column", md: "row" }}
    spacing={2}
    justifyContent="space-between"
    alignItems={{ xs: "flex-start", md: "center" }}
    >
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
    <Box
    sx={{
      width: 48,
      height: 48,
      borderRadius: 2.5,
      backgroundColor: "#E0ECFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
    >
    <CheckCircleOutlineOutlinedIcon sx={{ color: "#1565C0" }} />
    </Box>

    <Box>
    <Typography
    sx={{ color: "#0F172A", fontWeight: 800, fontSize: "1.05rem", mb: 0.5 }}
    >
    Final Review
    </Typography>
    <Typography sx={{ color: "#64748B", fontSize: "0.95rem" }}>
    Everything looks ready. Please confirm the details below
    before saving the appointment.
    </Typography>
    </Box>
    </Stack>

    <Chip
    icon={<CheckCircleOutlineOutlinedIcon />}
    label="Ready to save"
    color="success"
    variant="outlined"
    sx={{ fontWeight: 700 }}
    />
    </Stack>
    </Paper>

    {/* Detail cards */}
    <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
      gap: 2,
    }}
    >
    <Paper sx={detailCardStyle}>
    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
    <PlaceOutlinedIcon sx={{ color: "#1976d2" }} />
    <Typography sx={{ fontWeight: 700, color: "#0F172A" }}>
    Branch
    </Typography>
    </Stack>
    <Typography sx={{ color: "#334155" }}>
    {formData.branchName || "Not selected"}
    </Typography>
    </Paper>

    <Paper sx={detailCardStyle}>
    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
    <AccountBalanceOutlinedIcon sx={{ color: "#1976d2" }} />
    <Typography sx={{ fontWeight: 700, color: "#0F172A" }}>
    Appointment Topic
    </Typography>
    </Stack>
    <Typography sx={{ color: "#334155" }}>
    {formData.branchTopicName || "Not selected"}
    </Typography>
    </Paper>

    <Paper sx={detailCardStyle}>
    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
    <EventAvailableOutlinedIcon sx={{ color: "#1976d2" }} />
    <Typography sx={{ fontWeight: 700, color: "#0F172A" }}>
    Date & Time
    </Typography>
    </Stack>
    <Typography sx={{ color: "#334155" }}>
    {formatDateTime(formData.date, formData.time)}
    </Typography>
    </Paper>

    <Paper sx={detailCardStyle}>
    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
    <PersonOutlineOutlinedIcon sx={{ color: "#1976d2" }} />
    <Typography sx={{ fontWeight: 700, color: "#0F172A" }}>
    Full Name
    </Typography>
    </Stack>
    <Typography sx={{ color: "#334155" }}>
    {formData.name || "Not provided"}
    </Typography>
    </Paper>

    <Paper sx={detailCardStyle}>
    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
    <EmailOutlinedIcon sx={{ color: "#1976d2" }} />
    <Typography sx={{ fontWeight: 700, color: "#0F172A" }}>
    Email Address
    </Typography>
    </Stack>
    <Typography sx={{ color: "#334155" }}>
    {formData.email || "Not provided"}
    </Typography>
    </Paper>

    <Paper sx={detailCardStyle}>
    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
    <PhoneOutlinedIcon sx={{ color: "#1976d2" }} />
    <Typography sx={{ fontWeight: 700, color: "#0F172A" }}>
    Phone Number
    </Typography>
    </Stack>
    <Typography sx={{ color: "#334155" }}>
    {formatPhone(formData.phone)}
    </Typography>
    </Paper>
    </Box>


    {/* Additional Notes */}
    {formData.reason && (
      <Paper sx={detailCardStyle}>
      <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
      <TopicOutlinedIcon sx={{ color: "#1976d2" }} />
      <Typography sx={{ fontWeight: 700, color: "#0F172A" }}>
      Additional Notes
      </Typography>
      </Stack>
      <Typography sx={{ color: "#334155" }}>
      {formData.reason}
      </Typography>
      </Paper>
    )}

    {/* Before you save notice */}
    <Paper
    variant="outlined"
    sx={{
      p: 2,
      borderRadius: 3,
      borderColor: "#E2E8F0",
      backgroundColor: "#FAFCFF",
    }}
    >
    <Typography sx={{ fontWeight: 700, color: "#0F172A", mb: 0.75 }}>
    Before you save
    </Typography>
    <Typography sx={{ color: "#64748B", fontSize: "0.95rem" }}>
    Please make sure your branch, appointment topic, date, time, and
    contact information are correct.
    </Typography>
    </Paper>

    {/* Action Buttons */}
    <Box
    sx={{
      pt: 1,
      display: "flex",
      gap: 2,
      justifyContent: "space-between",
      flexDirection: { xs: "column-reverse", sm: "row" },
    }}
    >
    <Button
    variant="outlined"
    onClick={onPrev}
    sx={{
      minWidth: 120,
      py: 1.2,
      borderRadius: 2.5,
      fontWeight: 700,
      textTransform: "none",
    }}
    >
    Back
    </Button>

    <Button
    variant="contained"
    color="success"
    onClick={onConfirm}
    sx={{
      minWidth: 180,
      py: 1.2,
      borderRadius: 2.5,
      fontWeight: 700,
      textTransform: "none",
      boxShadow: "0 10px 24px rgba(46, 125, 50, 0.24)",
    }}
    >
    Save Appointment
    </Button>
    </Box>
    </Stack>
    </CardContent>
    </Card>
  );
};
