import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Button,
} from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { useAppointment } from "../context/AppointmentContext";

const APPOINTMENT_REASONS = [
  {
    title: "Account Opening",
    icon: <AccountBalanceWalletOutlinedIcon />,
    description: "Open a new personal or business bank account.",
  },
  {
    title: "Loan Application",
    icon: <RequestQuoteOutlinedIcon />,
    description: "Discuss loan options and start your application.",
  },
  {
    title: "Credit Card Application",
    icon: <CreditCardOutlinedIcon />,
    description: "Apply for a credit card that fits your needs.",
  },
  {
    title: "General Inquiry",
    icon: <HelpOutlineOutlinedIcon />,
    description: "Ask questions about banking services and support.",
  },
  {
    title: "Account Problem",
    icon: <ReportProblemOutlinedIcon />,
    description: "Get help with account issues or service concerns.",
  },
];

interface Step1Props {
  onNext: () => void;
}

export const Step1SelectReason: React.FC<Step1Props> = ({ onNext }) => {
  const { formData, updateFormData } = useAppointment();

  const handleSelectReason = (reason: string) => {
    updateFormData({ reason });
  };

  return (
    <Card
      sx={{
        maxWidth: 760,
        margin: "0 auto",
        marginTop: 4,
        borderRadius: 4,
        border: "1px solid #d9e2ec",
        boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
        overflow: "hidden",
      }}
    >
      <CardHeader
        title={
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "#0f172a", mb: 1 }}
          >
            Step 1: Select Appointment Reason
          </Typography>
        }
        subheader={
          <Typography sx={{ color: "#64748b", fontSize: "1rem" }}>
            Choose the reason for your appointment to continue the scheduling process.
          </Typography>
        }
        sx={{
          pb: 0,
          pt: 4,
          px: { xs: 3, sm: 4 },
        }}
      />

      <CardContent sx={{ px: { xs: 2, sm: 3 }, pb: 4 }}>
        <List sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {APPOINTMENT_REASONS.map((reason) => (
            <ListItem key={reason.title} disablePadding>
              <ListItemButton
                onClick={() => handleSelectReason(reason.title)}
                selected={formData.reason === reason.title}
                sx={{
                  border: "1px solid #d9e2ec",
                  borderRadius: 3,
                  px: 2.5,
                  py: 2,
                  alignItems: "flex-start",
                  transition: "all 0.25s ease",
                  backgroundColor:
                    formData.reason === reason.title ? "#f8fbff" : "#ffffff",
                  "&.Mui-selected": {
                    backgroundColor: "#f8fbff",
                    borderColor: "#1565c0",
                    boxShadow: "0 0 0 2px rgba(21, 101, 192, 0.12)",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#f8fbff",
                  },
                  "&:hover": {
                    backgroundColor: "#f8fbff",
                    borderColor: "#1565c0",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box
                  sx={{
                    minWidth: 44,
                    height: 44,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:
                      formData.reason === reason.title ? "#e8f1fb" : "#f4f7fb",
                    color: "#1565c0",
                    mr: 2,
                    mt: 0.5,
                  }}
                >
                  {reason.icon}
                </Box>

                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.08rem",
                        color: "#0f172a",
                        mb: 0.4,
                      }}
                    >
                      {reason.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={{
                        color: "#64748b",
                        fontSize: "0.95rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {reason.description}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Buttons */}
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            onClick={onNext}
            disabled={!formData.reason}
            sx={{
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