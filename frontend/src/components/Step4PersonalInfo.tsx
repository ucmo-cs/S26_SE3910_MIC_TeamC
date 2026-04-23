import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Button,
  TextField,
  Stack,
  Typography,
  Divider,
  Paper,
  Chip,
  InputAdornment,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { useAppointment } from "../context/AppointmentContext";

interface Step4Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Step4PersonalInfo: React.FC<Step4Props> = ({
  onNext,
  onPrev,
}) => {
  const { formData, updateFormData } = useAppointment();

  const [localName, setLocalName] = useState(formData.name || "");
  const [localEmail, setLocalEmail] = useState(formData.email || "");
  const [localPhone, setLocalPhone] = useState(formData.phone || "");
  const [localNotes, setLocalNotes] = useState(formData.reason || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = () => {
    const newErrors: { [key: string]: string } = {};

    if (!localName.trim()) {
      newErrors.name = "Name is required";
    }

    if (!localEmail.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(localEmail)) {
      newErrors.email = "Invalid email format";
    }

    if (!localPhone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (localPhone.replace(/\D/g, "").length !== 10) {
      newErrors.phone = "Phone number is invalid";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      updateFormData({
        name: localName,
        email: localEmail,
        phone: localPhone.replace(/\D/g, ""), // strip non-digits before saving
                     reason: localNotes,
      });
      onNext();
    }
  };

  const allFilled =
  localName.trim() &&
  validateEmail(localEmail) &&
  localPhone.replace(/\D/g, "").length === 10;

  const statusMessage = !localName.trim()
  ? "Full name is required"
  : !localEmail.trim()
  ? "Email address is required"
  : !validateEmail(localEmail)
  ? "Email address is invalid"
  : !localPhone.trim()
  ? "Phone number is required"
  : localPhone.replace(/\D/g, "").length !== 10
  ? "Phone number is invalid"
  : null;

  return (
    <Card
    sx={{
      maxWidth: 680,
      mx: "auto",
      mt: 4,
      borderRadius: 4,
      border: "1px solid #E5E7EB",
      boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)",
          overflow: "hidden",
    }}
    >
    <CardHeader
    title={
      <Box>
      <Typography
      variant="h5"
      sx={{ fontWeight: 700, color: "#0F172A", mb: 0.5 }}
      >
      Step 4: Enter Personal Information
      </Typography>
      <Typography variant="body2" sx={{ color: "#64748B" }}>
      Provide your contact details to confirm the appointment request.
      </Typography>
      </Box>
    }
    sx={{
      pb: 1,
      background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
    }}
    />

    <Divider />

    <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
    <Stack spacing={3}>
    <Paper
    variant="outlined"
    sx={{
      p: 2,
      borderRadius: 3,
      borderColor: "#E2E8F0",
      backgroundColor: "#F8FAFC",
    }}
    >
    <Stack
    direction={{ xs: "column", sm: "row" }}
    spacing={1.5}
    justifyContent="space-between"
    alignItems={{ xs: "flex-start", sm: "center" }}
    >
    <Box>
    <Typography
    variant="subtitle2"
    sx={{
      color: "#475569",
      fontWeight: 700,
      mb: 0.75,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    }}
    >
    Contact Details
    </Typography>

    <Typography sx={{ color: "#64748B", fontSize: "0.95rem" }}>
    Make sure your email and phone number are accurate so the bank
    can contact you if needed.
    </Typography>
    </Box>

    <Box sx={{ minWidth: 220, minHeight: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
    {allFilled ? (
      <Chip
      icon={<CheckCircleOutlineOutlinedIcon />}
      label="Ready to continue"
      color="success"
      variant="outlined"
      sx={{ fontWeight: 700 }}
      />
    ) : (
      <Chip
      icon={<WarningAmberOutlinedIcon />}
      label={statusMessage}
      color="warning"
      variant="outlined"
      sx={{ fontWeight: 700 }}
      />
    )}
    </Box>
    </Stack>
    </Paper>

    <Stack spacing={2.25}>
    <TextField
    label="Full Name"
    value={localName}
    onChange={(e) => setLocalName(e.target.value)}
    fullWidth
    error={!!errors.name}
    helperText={errors.name}
    placeholder="Enter your full name"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
        <PersonOutlineOutlinedIcon sx={{ color: "#64748B" }} />
        </InputAdornment>
      ),
    }}
    />

    <TextField
    label="Email Address"
    type="email"
    value={localEmail}
    onChange={(e) => setLocalEmail(e.target.value)}
    fullWidth
    error={!!errors.email}
    helperText={errors.email}
    placeholder="name@example.com"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
        <EmailOutlinedIcon sx={{ color: "#64748B" }} />
        </InputAdornment>
      ),
    }}
    />

    <TextField
    label="Phone Number"
    value={localPhone}
    onChange={(e) => setLocalPhone(e.target.value)}
    fullWidth
    placeholder="1234567890 or 123-456-7890"
    error={!!errors.phone}
    helperText={errors.phone || "Enter a 10-digit phone number"}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
        <PhoneOutlinedIcon sx={{ color: "#64748B" }} />
        </InputAdornment>
      ),
    }}
    />

    <TextField
    label="Additional Notes"
    value={localNotes}
    onChange={(e) => setLocalNotes(e.target.value)}
    fullWidth
    multiline
    rows={3}
    placeholder="Briefly describe the reason for your visit (optional)"
    />
    </Stack>

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
    onClick={handleNext}
    sx={{
      minWidth: 140,
      py: 1.2,
      borderRadius: 2.5,
      fontWeight: 700,
      textTransform: "none",
      boxShadow: "0 10px 24px rgba(25, 118, 210, 0.24)",
    }}
    >
    Next
    </Button>
    </Box>
    </Stack>
    </CardContent>
    </Card>
  );
};
