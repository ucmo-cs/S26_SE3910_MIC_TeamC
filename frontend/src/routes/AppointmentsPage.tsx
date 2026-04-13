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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 3,
          }}
        >
          <Typography variant="h4" component="h1">
            All Appointments
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate({ to: "/schedule/step1" })}
          >
            Schedule New Appointment
          </Button>
        </Box>

        {appointments.length === 0 ? (
          <Paper sx={{ padding: 3, textAlign: "center" }}>
            <Typography color="textSecondary">
              No appointments scheduled yet.
            </Typography>
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={() => navigate({ to: "/schedule/step1" })}
            >
              Schedule Your First Appointment
            </Button>
          </Paper>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Reason</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Location</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Date & Time</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Phone</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((apt: Appointment) => (
                  <TableRow key={apt.id}>
                    <TableCell>{apt.name}</TableCell>
                    <TableCell>{apt.reason}</TableCell>
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
      </Box>

      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this appointment? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
