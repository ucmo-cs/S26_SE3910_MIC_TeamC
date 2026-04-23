import React from "react";
import { Box, Container, Typography, Button, Stack, Paper } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 72px)",
        background: "linear-gradient(180deg, #f4f7fb 0%, #e9eef5 100%)",
        display: "flex",
        alignItems: "center",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            textAlign: "center",
            px: { xs: 3, sm: 6 },
            py: { xs: 5, sm: 7 },
            borderRadius: 4,
            border: "1px solid #d9e2ec",
            boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              mb: 2,
              fontSize: { xs: "2.2rem", sm: "3rem" },
            }}
          >
            Welcome to Commerce Bank
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#475569",
              mb: 2,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Schedule an appointment or view your existing appointments with a
            secure and convenient banking experience.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#64748b",
              maxWidth: 600,
              mx: "auto",
              mb: 4,
            }}
          >
            Manage your appointments, stay organized, and access banking
            services through a clean and easy-to-use portal designed for
            customers.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 2 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate({ to: "/schedule/step1" })}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 700,
                fontSize: "1rem",
                backgroundColor: "#1565c0",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#0d47a1",
                  boxShadow: "0 8px 20px rgba(21, 101, 192, 0.25)",
                },
              }}
            >
              Schedule an Appointment
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate({ to: "/appointments" })}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 700,
                fontSize: "1rem",
                borderColor: "#1565c0",
                color: "#1565c0",
                "&:hover": {
                  borderColor: "#0d47a1",
                  backgroundColor: "#f8fbff",
                },
              }}
            >
              View Appointments
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};