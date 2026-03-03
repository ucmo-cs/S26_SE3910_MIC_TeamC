import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import { useAppointment } from "../context/AppointmentContext";

const LOCATIONS = ["North", "South", "East", "West"];

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
    onNext();
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto", marginTop: 4 }}>
      <CardHeader title="Step 2: Select Location" />
      <CardContent>
        <List>
          {LOCATIONS.map((location) => (
            <ListItem key={location} disablePadding>
              <ListItemButton
                onClick={() => handleSelectLocation(location)}
                selected={formData.location === location}
              >
                <ListItemText primary={location} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
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
        </Box>
      </CardContent>
    </Card>
  );
};
