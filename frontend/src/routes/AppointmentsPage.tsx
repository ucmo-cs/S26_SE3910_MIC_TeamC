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
import type { Appointment } from "../types";

export const AppointmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const API_BASE = "http://localhost:8080/api";

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      fetch(`${API_BASE}/appointments/${selectedId}`, {
        method: "DELETE",
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Delete failed");
        }
        setAppointments((prev) =>
        prev.filter((apt) => apt.id !== selectedId)
        );
        setSelectedId(null);
      })
      .catch((err) => console.error(err));
    }
    setDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedId(null);
  };

  const formatDateTime = (date: string, time: string) => {
    const [year, month, day] = date.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const [hourStr, minuteStr] = time.split(":");
    const hour = parseInt(hourStr);
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const formattedTime = `${displayHour}:${minuteStr} ${period}`;
    return `${formattedDate} at ${formattedTime}`;
  };

  React.useEffect(() => {
    fetch(`${API_BASE}/appointments`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch appointments");
      }
      return res.json();
    })
    .then((data) => {
      const mapped = data.map((apt: any) => ({
        id: apt.id,
        name: apt.user.name,
        email: apt.user.email,
        phone: apt.phoneNumber,
        location: apt.branchTopic.branch.name,
        reason: apt.reason,
        date: apt.startTime.split("T")[0],
                                             time: apt.startTime.split("T")[1],
      }));
      setAppointments(mapped);
    });
  }, []);

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "";
    // Remove all non-digit characters just in case
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) return phone; // fallback
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
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
        <TableCell>{formatPhoneNumber(apt.phone)}</TableCell>
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
