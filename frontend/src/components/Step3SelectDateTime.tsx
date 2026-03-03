import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Button,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import { useAppointment } from "../context/AppointmentContext";

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const formatTimeSlot = (time: string): string => {
  const hour = parseInt(time.split(":")[0]);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:00 ${period}`;
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
  const [localDate, setLocalDate] = useState<Dayjs | null>(
    formData.date ? dayjs(formData.date) : null,
  );
  const [localTime, setLocalTime] = useState(formData.time || "");

  const handleNext = () => {
    if (localDate && localTime) {
      updateFormData({
        date: localDate.format("YYYY-MM-DD"),
        time: localTime,
      });
      onNext();
    }
  };

  return (
    <Card sx={{ maxWidth: 700, margin: "0 auto", marginTop: 4 }}>
      <CardHeader title="Step 3: Select Date and Time" />
      <CardContent>
        <Stack spacing={3}>
          {/* Date Selection */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ marginBottom: 2, fontWeight: 600 }}
            >
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

          {/* Time Selection */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ marginBottom: 2, fontWeight: 600 }}
            >
              Select Time
            </Typography>
            <Grid container spacing={1}>
              {TIME_SLOTS.map((time) => (
                <Grid size={{ xs: 6, sm: 4, md: 3 }} key={time}>
                  <Button
                    fullWidth
                    variant={localTime === time ? "contained" : "outlined"}
                    onClick={() => setLocalTime(time)}
                    sx={{
                      py: 1.5,
                    }}
                  >
                    {formatTimeSlot(time)}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Action Buttons */}
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
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!localDate || !localTime}
            >
              Next
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
