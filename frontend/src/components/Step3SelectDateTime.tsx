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
  Divider,
  Chip,
  Paper,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
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
  const hour = parseInt(time.split(":")[0], 10);
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

  const formattedSelectedDate = localDate
    ? localDate.format("MMMM D, YYYY")
    : "No date selected";

  const formattedSelectedTime = localTime
    ? formatTimeSlot(localTime)
    : "No time selected";

  return (
    <Card
      sx={{
        maxWidth: 760,
        mx: "auto",
        mt: 4,
        borderRadius: 4,
        border: "1px solid #E5E7EB",
        boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)",
        overflow: "hidden",
      }}
    >
      <CardHeader
        title={
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "#0F172A", mb: 0.5 }}
            >
              Step 3: Select Date and Time
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748B" }}>
              Choose the appointment date and an available time slot.
            </Typography>
          </Box>
        }
        sx={{
          pb: 1,
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        }}
      />

      <Divider />

      <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
        <Stack spacing={3.5}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 3,
              borderColor: "#E2E8F0",
              backgroundColor: "#F8FAFC",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
            >
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#475569",
                    fontWeight: 700,
                    mb: 0.75,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Current Selection
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  useFlexGap
                  flexWrap="wrap"
                >
                  <Chip
                    icon={<CalendarMonthOutlinedIcon />}
                    label={formattedSelectedDate}
                    sx={{
                      fontWeight: 600,
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                    }}
                  />
                  <Chip
                    icon={<AccessTimeOutlinedIcon />}
                    label={formattedSelectedTime}
                    sx={{
                      fontWeight: 600,
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                    }}
                  />
                </Stack>
              </Box>

              {localDate && localTime && (
                <Chip
                  icon={<EventAvailableOutlinedIcon />}
                  label="Ready to continue"
                  color="success"
                  variant="outlined"
                  sx={{ fontWeight: 700 }}
                />
              )}
            </Stack>
          </Paper>

          {/* Date Selection */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 1.5,
                fontWeight: 700,
                color: "#0F172A",
              }}
            >
              Select Date
            </Typography>

            <Typography
              variant="body2"
              sx={{ mb: 2, color: "#64748B" }}
            >
              Pick a date starting from today.
            </Typography>

            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                borderRadius: 3,
                borderColor: "#E2E8F0",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#FFFFFF",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={localDate}
                  onChange={setLocalDate}
                  minDate={dayjs()}
                />
              </LocalizationProvider>
            </Paper>
          </Box>

          {/* Time Selection */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 1.5,
                fontWeight: 700,
                color: "#0F172A",
              }}
            >
              Select Time
            </Typography>

            <Typography
              variant="body2"
              sx={{ mb: 2, color: "#64748B" }}
            >
              Choose from the available appointment slots below.
            </Typography>

            <Grid container spacing={1.5}>
              {TIME_SLOTS.map((time) => {
                const isSelected = localTime === time;

                return (
                  <Grid size={{ xs: 6, sm: 4, md: 3 }} key={time}>
                    <Button
                      fullWidth
                      variant={isSelected ? "contained" : "outlined"}
                      onClick={() => setLocalTime(time)}
                      sx={{
                        py: 1.5,
                        borderRadius: 2.5,
                        fontWeight: 700,
                        textTransform: "none",
                        boxShadow: isSelected
                          ? "0 8px 20px rgba(25, 118, 210, 0.22)"
                          : "none",
                      }}
                    >
                      {formatTimeSlot(time)}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              pt: 1,
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              flexDirection: { xs: "column-reverse", sm: "row" },
            }}
          >
            <Button
              variant="outlined"
              onClick={onPrev}
              sx={{
                minWidth: 120,
                py: 1.2,
                borderRadius: 2.5,
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              Back
            </Button>

            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!localDate || !localTime}
              sx={{
                minWidth: 140,
                py: 1.2,
                borderRadius: 2.5,
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "0 10px 24px rgba(25, 118, 210, 0.24)",
              }}
            >
              Next
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};