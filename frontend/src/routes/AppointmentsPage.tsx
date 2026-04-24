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
import type { Appointment } from "../types";

export const AppointmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const API_BASE = "http://localhost:8080/api";

  React.useEffect(() => {
    fetch(`${API_BASE}/appointments`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch appointments");
      return res.json();
    })
    .then((data) => {
      const mapped = data.map((apt: any) => ({
        id: apt.id,
        name: apt.user.name,
        email: apt.user.email,
        phone: apt.phoneNumber,
        location: apt.branchTopic.branch.name,
        topic: apt.branchTopic.topic.name,
        reason: apt.reason,
        date: apt.startTime.split("T")[0],
                                             time: apt.startTime.split("T")[1],
      }));
      setAppointments(mapped);
    })
    .catch((err) => console.error(err));
  }, []);

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      fetch(`${API_BASE}/appointments/${selectedId}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        setAppointments((prev) => prev.filter((apt) => apt.id !== selectedId));
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

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "";
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) return phone;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
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
      <EventAvailableIcon sx={{ fontSize: 52, color: "#1565c0", mb: 2 }} />
      <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", mb: 1 }}>
      No appointments scheduled yet
      </Typography>
      <Typography sx={{ color: "#64748b", mb: 3 }}>
      Start by scheduling your first appointment through the banking portal.
      </Typography>
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
      <TableCell sx={{ fontWeight: 700, color: "#0f172a" }}>Name</TableCell>
      <TableCell sx={{ fontWeight: 700, color: "#0f172a" }}>Topic</TableCell>
      <TableCell sx={{ fontWeight: 700, color: "#0f172a" }}>Reason</TableCell>
      <TableCell sx={{ fontWeight: 700, color: "#0f172a" }}>Location</TableCell>
      <TableCell sx={{ fontWeight: 700, color: "#0f172a" }}>Date & Time</TableCell>
      <TableCell sx={{ fontWeight: 700, color: "#0f172a" }}>Email</TableCell>
      <TableCell sx={{ fontWeight: 700, color: "#0f172a" }}>Phone</TableCell>
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
          "&:hover": { backgroundColor: "#fafcff" },
        }}
        >
        <TableCell sx={{ fontWeight: 600 }}>{apt.name}</TableCell>
        <TableCell>
        <Chip
        label={apt.topic}
        size="small"
        sx={{
          backgroundColor: "#eef4fb",
          color: "#1565c0",
          fontWeight: 600,
        }}
        />
        </TableCell>
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
        sx={{
          border: "1px solid #fecaca",
          "&:hover": { backgroundColor: "#fef2f2" },
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
    PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
    <DialogTitle sx={{ fontWeight: 700 }}>Delete Appointment</DialogTitle>
    <DialogContent>
    <DialogContentText sx={{ color: "#475569" }}>
    Are you sure you want to delete this appointment? This action cannot be undone.
    </DialogContentText>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2 }}>
    <Button onClick={handleCancelDelete} sx={{ textTransform: "none", fontWeight: 600 }}>
    Cancel
    </Button>
    <Button
    onClick={handleConfirmDelete}
    color="error"
    variant="contained"
    sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2 }}
    >
    Delete
    </Button>
    </DialogActions>
    </Dialog>
    </Box>
  );
};
