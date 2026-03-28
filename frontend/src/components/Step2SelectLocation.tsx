import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useAppointment } from "../context/AppointmentContext";

const LOCATIONS = [
  {
    id: "North Branch",
    address: "1201 North Main St, Kansas City, MO",
    hours: "Mon–Fri, 9:00 AM – 5:00 PM",
    services: ["Checking", "Savings", "Loans"],
  },
  {
    id: "South Branch",
    address: "845 South Plaza Ave, Kansas City, MO",
    hours: "Mon–Fri, 9:00 AM – 5:00 PM",
    services: ["Checking", "Credit Cards", "Mortgage"],
  },
  {
    id: "East Branch",
    address: "410 East Market St, Kansas City, MO",
    hours: "Mon–Fri, 9:00 AM – 5:00 PM",
    services: ["Savings", "Business Banking", "Loans"],
  },
  {
    id: "West Branch",
    address: "990 West Oak Blvd, Kansas City, MO",
    hours: "Mon–Fri, 9:00 AM – 5:00 PM",
    services: ["Checking", "Investments", "Wealth Support"],
  },
];

interface Step2Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Step2SelectLocation: React.FC<Step2Props> = ({
  onNext,
  onPrev,
}) => {
  const { formData, updateFormData } = useAppointment();

  const handleSelectLocation = (location: string) => {
    updateFormData({ location });
  };

  return (
    <Card
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: 4,
        borderRadius: 4,
        border: "1px solid #e2e8f0",
        boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "#2563eb",
              mb: 1,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Step 2
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              mb: 1,
              fontSize: { xs: "1.6rem", md: "2rem" },
            }}
          >
            Select a branch location
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              fontSize: "1rem",
              maxWidth: 700,
            }}
          >
            Choose the branch that works best for your appointment. You can review
            branch details before continuing.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          {LOCATIONS.map((location) => {
            const isSelected = formData.location === location.id;

            return (
              <Card
                key={location.id}
                onClick={() => handleSelectLocation(location.id)}
                sx={{
                  cursor: "pointer",
                  borderRadius: 3,
                  border: isSelected
                    ? "2px solid #2563eb"
                    : "1px solid #e2e8f0",
                  backgroundColor: isSelected ? "#eff6ff" : "#ffffff",
                  boxShadow: isSelected
                    ? "0 12px 28px rgba(37, 99, 235, 0.14)"
                    : "0 8px 20px rgba(15, 23, 42, 0.04)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)",
                    borderColor: "#93c5fd",
                  },
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                    sx={{ mb: 1.5 }}
                  >
                    <Box sx={{ display: "flex", gap: 1.25 }}>
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: 2,
                          backgroundColor: isSelected ? "#dbeafe" : "#f8fafc",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <AccountBalanceOutlinedIcon
                          sx={{ color: isSelected ? "#2563eb" : "#475569" }}
                        />
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 800,
                            color: "#0f172a",
                            fontSize: "1.05rem",
                            mb: 0.5,
                          }}
                        >
                          {location.id}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.75,
                            color: "#64748b",
                            mb: 0.75,
                          }}
                        >
                          <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
                          <Typography sx={{ fontSize: "0.95rem" }}>
                            {location.address}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.75,
                            color: "#64748b",
                          }}
                        >
                          <ScheduleOutlinedIcon sx={{ fontSize: 18 }} />
                          <Typography sx={{ fontSize: "0.95rem" }}>
                            {location.hours}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {isSelected && (
                      <CheckCircleRoundedIcon sx={{ color: "#2563eb" }} />
                    )}
                  </Stack>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {location.services.map((service) => (
                      <Chip
                        key={service}
                        label={service}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          backgroundColor: "#f8fafc",
                          color: "#334155",
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            onClick={onPrev}
            sx={{
              minWidth: 120,
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2.5,
            }}
          >
            Back
          </Button>

          <Button
            variant="contained"
            onClick={onNext}
            disabled={!formData.location}
            sx={{
              minWidth: 140,
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2.5,
              px: 3,
            }}
          >
            Continue
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};