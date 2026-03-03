import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Welcome to Commerce Bank
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Schedule an appointment or view your existing appointments.
        </Typography>
        <Box sx={{ marginTop: 4, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate({ to: "/schedule/step1" })}
          >
            Schedule an Appointment
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate({ to: "/appointments" })}
          >
            View Appointments
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
