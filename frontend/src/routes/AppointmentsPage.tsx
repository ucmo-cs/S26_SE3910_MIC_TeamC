import React from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Container,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useAppointment } from "../context/AppointmentContext";
import type { Appointment } from "../types";

export const AppointmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { appointments, deleteAppointment } = useAppointment();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      deleteAppointment(selectedId);
      setSelectedId(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedId(null);
  };

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return `${formattedDate} at ${time}`;
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 72px)",
        background: "linear-gradient(180deg, #f4f7fb 0%, #e9eef5 100%)",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            border: "1px solid #d9e2ec",
            boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
            backgroundColor: "#ffffff",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={2}
            sx={{ mb: 4 }}
          >
            <Box>
              <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1 }}>
                <CalendarMonthIcon sx={{ color: "#1565c0" }} />
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ fontWeight: 800, color: "#0f172a" }}
                >
                  All Appointments
                </Typography>
              </Stack>
              <Typography sx={{ color: "#64748b" }}>
                View and manage scheduled customer appointments in one place.
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={() => navigate({ to: "/schedule/step1" })}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                px: 3,
                py: 1.2,
                borderRadius: 2.5,
                backgroundColor: "#1565c0",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#0d47a1",
                  boxShadow: "0 8px 20px rgba(21, 101, 192, 0.25)",
                },
              }}
            >
              Schedule New Appointment
            </Button>
          </Stack>

          {appointments.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: 4,
                backgroundColor: "#f8fbff",
                border: "1px dashed #bfd3ea",
              }}
            >
              <EventAvailableIcon
                sx={{ fontSize: 52, color: "#1565c0", mb: 2 }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#0f172a", mb: 1 }}
              >
                No appointments scheduled yet
              </Typography>
              <Typography sx={{ color: "#64748b", mb: 3 }}>
                Start by scheduling your first appointment through the banking
                portal.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  px: 3,
                  py: 1.2,
                  borderRadius: 2.5,
                  backgroundColor: "#1565c0",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#0d47a1",
                    boxShadow: "0 8px 20px rgba(21, 101, 192, 0.25)",
                  },
                }}
                onClick={() => navigate({ to: "/schedule/step1" })}
              >
                Schedule Your First Appointment
              </Button>
            </Paper>
          ) : (
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
              }}
            >
              <Table>
                <TableHead sx={{ backgroundColor: "#f8fbff" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: "#0f172a" }}>
                      Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "#0f172a" }}>
                      Reason
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "#0f172a" }}>
                      Location
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "#0f172a" }}>
                      Date & Time
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "#0f172a" }}>
                      Email
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "#0f172a" }}>
                      Phone
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: "#0f172a" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((apt: Appointment) => (
                    <TableRow
                      key={apt.id}
                      hover
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": {
                          backgroundColor: "#fafcff",
                        },
                      }}
                    >
                      <TableCell sx={{ fontWeight: 600 }}>{apt.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={apt.reason}
                          size="small"
                          sx={{
                            backgroundColor: "#eef4fb",
                            color: "#1565c0",
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell>{apt.location}</TableCell>
                      <TableCell>{formatDateTime(apt.date, apt.time)}</TableCell>
                      <TableCell>{apt.email}</TableCell>
                      <TableCell>{apt.phone}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteClick(apt.id)}
                          title="Delete appointment"
                          sx={{
                            border: "1px solid #fecaca",
                            "&:hover": {
                              backgroundColor: "#fef2f2",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#475569" }}>
            Are you sure you want to delete this appointment? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCancelDelete}
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};