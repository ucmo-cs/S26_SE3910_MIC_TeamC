import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

interface Branch {
  id: number;
  name: string;
  address: string;
}

interface Step1Props {
  onNext: () => void;
  onPrev: () => void;
  onDataChange: (data: any) => void;
  value: number;
}

export const Step1SelectLocation: React.FC<Step1Props> = ({
  onNext,
  onPrev,
  onDataChange,
  value,
}) => {
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
    onDataChange({
      branchId: branch.id,
      branchName: branch.name,
      branchAddress: branch.address,
    });
  };

  return (
    <Card
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: 4,
        borderRadius: 4,
        border: "1px solid #e2e8f0",
        boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "#2563eb",
              mb: 1,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Step 1
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              mb: 1,
              fontSize: { xs: "1.6rem", md: "2rem" },
            }}
          >
            Select a branch location
          </Typography>

          <Typography
            sx={{ color: "#64748b", fontSize: "1rem", maxWidth: 700 }}
          >
            Choose the branch that works best for your appointment. You can
            review branch details before continuing.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2,
            }}
          >
            {locations.map((branch) => {
              const isSelected = value === branch.id;

              return (
                <Card
                  key={branch.id}
                  onClick={() => handleSelectLocation(branch)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: 3,
                    border: isSelected
                      ? "2px solid #2563eb"
                      : "1px solid #e2e8f0",
                    backgroundColor: isSelected ? "#eff6ff" : "#ffffff",
                    boxShadow: isSelected
                      ? "0 12px 28px rgba(37, 99, 235, 0.14)"
                      : "0 8px 20px rgba(15, 23, 42, 0.04)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)",
                      borderColor: "#93c5fd",
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Box sx={{ display: "flex", gap: 1.25 }}>
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            backgroundColor: isSelected ? "#dbeafe" : "#f8fafc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <AccountBalanceOutlinedIcon
                            sx={{ color: isSelected ? "#2563eb" : "#475569" }}
                          />
                        </Box>

                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 800,
                              color: "#0f172a",
                              fontSize: "1.05rem",
                              mb: 0.5,
                            }}
                          >
                            {branch.name}
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.75,
                              color: "#94a3b8",
                            }}
                          >
                            <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
                            <Typography
                              sx={{ fontSize: "0.95rem", fontStyle: "italic" }}
                            >
                              {branch.address}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      {isSelected && (
                        <CheckCircleRoundedIcon sx={{ color: "#2563eb" }} />
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}

        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            onClick={onPrev}
            sx={{
              minWidth: 120,
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2.5,
            }}
          >
            Back
          </Button>

          <Button
            variant="contained"
            onClick={onNext}
            disabled={!value}
            sx={{
              minWidth: 140,
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2.5,
              px: 3,
            }}
          >
            Continue
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
