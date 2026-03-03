import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useAppointment } from "../context/AppointmentContext";

const APPOINTMENT_REASONS = [
  "Account Opening",
  "Loan Application",
  "Credit Card Application",
  "General Inquiry",
  "Account Problem",
];

interface Step1Props {
  onNext: () => void;
}

export const Step1SelectReason: React.FC<Step1Props> = ({ onNext }) => {
  const { formData, updateFormData } = useAppointment();

  const handleSelectReason = (reason: string) => {
    updateFormData({ reason });
    onNext();
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto", marginTop: 4 }}>
      <CardHeader title="Step 1: Select Appointment Reason" />
      <CardContent>
        <List>
          {APPOINTMENT_REASONS.map((reason) => (
            <ListItem key={reason} disablePadding>
              <ListItemButton
                onClick={() => handleSelectReason(reason)}
                selected={formData.reason === reason}
              >
                <ListItemText primary={reason} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
