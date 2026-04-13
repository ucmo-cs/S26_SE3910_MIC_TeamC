import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { useAppointment } from "../context/AppointmentContext";

interface Branch {
  id: number;
  name: string;
}

interface Step2Props {
  onNext: () => void;
  onPrev: () => void;
  onDataChange: (data: any) => void; // Ensure this is passed in correctly
}

export const Step1SelectLocation: React.FC<Step2Props> = ({ onNext, onPrev, onDataChange }) => {
  const [locations, setLocations] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/branches")
    .then((res) => res.json())
    .then((data) => setLocations(data))
    .catch((err) => console.error(err))
    .finally(() => setLoading(false));
  }, []);

  const handleSelectLocation = (branch: Branch) => {
    console.log("Selected branch:", branch); // Debugging log
    onDataChange({
      branchId: branch.id,  // Make sure to update branchId here
      branchName: branch.name, // Optionally save the branch name as well
    });
    onNext();
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto", marginTop: 4 }}>
    <CardHeader title="Step 1: Select Location" />
    <CardContent>
    {loading ? (
      <Box sx={{ textAlign: "center", py: 2 }}>
      <CircularProgress />
      </Box>
    ) : (
      <List>
      {locations.map((loc) => (
        <ListItem key={loc.id} disablePadding>
        <ListItemButton onClick={() => handleSelectLocation(loc)}>
        <ListItemText primary={loc.name} />
        </ListItemButton>
        </ListItem>
      ))}
      </List>
    )}
    <Box sx={{ marginTop: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
    <Button variant="outlined" onClick={onPrev}>
    Back
    </Button>
    </Box>
    </CardContent>
    </Card>
  );
};
