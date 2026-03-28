import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleScheduleAppointment = () => {
    navigate({ to: "/schedule/step1" });
    handleMenuClose();
  };

  const handleListAppointments = () => {
    navigate({ to: "/appointments" });
    handleMenuClose();
  };

  const handleHomeClick = () => {
    navigate({ to: "/" });
    handleMenuClose();
  };

  const handleLoginClick = () => {
    navigate({ to: "/login" });
    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "linear-gradient(90deg, #1565c0 0%, #0d47a1 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <Toolbar sx={{ minHeight: "72px", px: { xs: 2, md: 4 } }}>
        <Box
          onClick={handleHomeClick}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            flexGrow: 1,
          }}
        >
          <AccountBalanceIcon sx={{ color: "white", fontSize: 30 }} />
          <Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.2rem", md: "1.4rem" },
                color: "white",
                lineHeight: 1.1,
              }}
            >
              Commerce Bank
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.8rem",
                display: { xs: "none", sm: "block" },
              }}
            >
              Appointment Scheduling Portal
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <Button
            onClick={handleHomeClick}
            color="inherit"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 2,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.12)",
              },
            }}
          >
            Home
          </Button>

          <Button
            onClick={handleLoginClick}
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2,
              px: 2.5,
              backgroundColor: "white",
              color: "#1565c0",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#f4f7fb",
                boxShadow: "none",
              },
            }}
          >
            Login
          </Button>

          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenuOpen}
            color="inherit"
            startIcon={<MenuIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 2,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.12)",
              },
            }}
          >
            Menu
          </Button>
        </Box>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          PaperProps={{
            elevation: 4,
            sx: {
              mt: 1,
              borderRadius: 2,
              minWidth: 220,
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
            },
          }}
        >
          <MenuItem onClick={handleHomeClick}>Home</MenuItem>
          <MenuItem onClick={handleScheduleAppointment}>
            Schedule an Appointment
          </MenuItem>
          <MenuItem onClick={handleListAppointments}>
            List All Appointments
          </MenuItem>
          <MenuItem onClick={handleLoginClick}>Login</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};