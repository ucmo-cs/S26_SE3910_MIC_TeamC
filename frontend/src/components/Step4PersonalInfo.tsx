import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { useAppointment } from "../context/AppointmentContext";

interface Step4Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Step4PersonalInfo: React.FC<Step4Props> = ({ onNext, onPrev }) => {
  const { formData, updateFormData } = useAppointment();
  const [localName, setLocalName] = useState(formData.name || "");
  const [localEmail, setLocalEmail] = useState(formData.email || "");
  const [localPhone, setLocalPhone] = useState(formData.phone || "");
  const [localReason, setLocalReason] = useState(formData.reason || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$|^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phone.replace(/\D/g, "").length === 10 ? phone : phone);
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
      newErrors.phone = "Phone must be 10 digits or in format XXX-XXX-XXXX";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      updateFormData({
        name: localName,
        email: localEmail,
        phone: localPhone.replace(/\D/g, ""), // strip dashes before saving
                     reason: localReason,
      });
      onNext();
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto", marginTop: 4 }}>
    <CardHeader title="Step 4: Enter Personal Information" />
    <CardContent>
    <Stack spacing={2}>
    <TextField
    label="Full Name"
    value={localName}
    onChange={(e) => setLocalName(e.target.value)}
    fullWidth
    error={!!errors.name}
    helperText={errors.name}
    />
    <TextField
    label="Email"
    type="email"
    value={localEmail}
    onChange={(e) => setLocalEmail(e.target.value)}
    fullWidth
    error={!!errors.email}
    helperText={errors.email}
    />
    <TextField
    label="Phone Number"
    value={localPhone}
    onChange={(e) => setLocalPhone(e.target.value)}
    fullWidth
    placeholder="1234567890 or 123-456-7890"
    error={!!errors.phone}
    helperText={errors.phone}
    />
    <TextField
    label="Additional Information"
    value={localReason}
    onChange={(e) => setLocalReason(e.target.value)}
    fullWidth
    multiline
    rows={3}
    placeholder="Briefly describe the reason for your visit (optional)"
    />
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
    <Button variant="contained" onClick={handleNext}>
    Next
    </Button>
    </Box>
    </Stack>
    </CardContent>
    </Card>
  );
};
