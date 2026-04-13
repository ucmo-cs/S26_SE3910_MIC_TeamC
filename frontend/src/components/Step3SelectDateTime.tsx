import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Button,
  Stack,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import { useAppointment } from "../context/AppointmentContext";

const API_BASE = "http://localhost:8080/api";

const formatTimeSlot = (time: string): string => {
  const [hourStr, minuteStr] = time.split(":");
  const hour = parseInt(hourStr);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${minuteStr} ${period}`;
};

interface Step3Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Step3SelectDateTime: React.FC<Step3Props> = ({
  onNext,
  onPrev,
}) => {
  const { formData, updateFormData } = useAppointment();

  const parsed = dayjs(formData.startTime);
  const isValidDate = parsed.isValid();

  const [localDate, setLocalDate] = useState<Dayjs | null>(
    isValidDate ? parsed : null
  );
  const [localTime, setLocalTime] = useState(
    isValidDate ? parsed.format("HH:mm") : ""
  );
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [takenSlots, setTakenSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  // Fetch available slots for the selected date and branch
  useEffect(() => {
    if (!localDate) {
      setAvailableSlots([]);
      return;
    }

    const branchId = formData.branchId;
    const dateStr = localDate.format("YYYY-MM-DD");

    setSlotsLoading(true);

    const availablePromise = branchId
    ? fetch(`${API_BASE}/branchtimes?branchId=${branchId}&date=${dateStr}`)
    : fetch(`${API_BASE}/branchtimes?date=${dateStr}`);

    const takenPromise = fetch(
      `${API_BASE}/appointments/taken-slots?date=${dateStr}`
    );

    Promise.all([availablePromise, takenPromise])
    .then(async ([availableRes, takenRes]) => {
      if (!availableRes.ok) throw new Error("Failed to fetch available slots");
      if (!takenRes.ok) throw new Error("Failed to fetch taken slots");
      const availableData = await availableRes.json();
      const takenData: string[] = await takenRes.json();

      const slots: string[] = availableData
      .map((bt: { availableTime: string }) => bt.availableTime.substring(0, 5))
      .sort();

      setAvailableSlots(slots);
      setTakenSlots(takenData);

      if (localTime && (takenData.includes(localTime) || !slots.includes(localTime))) {
        setLocalTime("");
      }
    })
    .catch((err) => console.error(err))
    .finally(() => setSlotsLoading(false));
  }, [localDate]);

  const handleNext = () => {
    if (!localDate || !localTime) return;

    const combinedDateTime = dayjs(
      `${localDate.format("YYYY-MM-DD")}T${localTime}`
    ).format("YYYY-MM-DDTHH:mm:ss");

    updateFormData({
      startTime: combinedDateTime,
      date: localDate.format("YYYY-MM-DD"),
                   time: localTime,
    });

    onNext();
  };

  return (
    <Card sx={{ maxWidth: 700, margin: "0 auto", marginTop: 4 }}>
    <CardHeader title="Step 3: Select Date and Time" />
    <CardContent>
    <Stack spacing={3}>
    <Box>
    <Typography variant="subtitle1" sx={{ marginBottom: 2, fontWeight: 600 }}>
    Select Date
    </Typography>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DateCalendar
    value={localDate}
    onChange={setLocalDate}
    minDate={dayjs()}
    />
    </LocalizationProvider>
    </Box>

    <Box>
    <Typography variant="subtitle1" sx={{ marginBottom: 2, fontWeight: 600 }}>
    Select Time
    </Typography>
    {!localDate ? (
      <Typography color="textSecondary">Please select a date first.</Typography>
    ) : slotsLoading ? (
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
      <CircularProgress size={28} />
      </Box>
    ) : availableSlots.length === 0 ? (
      <Typography color="textSecondary">No available time slots for this day.</Typography>
    ) : (
      <Grid container spacing={1}>
      {availableSlots.map((time) => {
        const isTaken = takenSlots.includes(time);
        return (
          <Grid item xs={6} sm={4} md={3} key={time}>
          <Button
          fullWidth
          variant={localTime === time ? "contained" : "outlined"}
          onClick={() => setLocalTime(time)}
          disabled={isTaken}
          sx={{ py: 1.5 }}
          >
          {formatTimeSlot(time)}
          </Button>
          </Grid>
        );
      })}
      </Grid>
    )}
    </Box>

    <Box sx={{ marginTop: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
    <Button variant="outlined" onClick={onPrev}>Back</Button>
    <Button variant="contained" onClick={handleNext} disabled={!localDate || !localTime}>Next</Button>
    </Box>
    </Stack>
    </CardContent>
    </Card>
  );
};
