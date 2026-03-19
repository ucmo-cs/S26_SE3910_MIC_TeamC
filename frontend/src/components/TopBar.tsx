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
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          onClick={handleHomeClick}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              fontSize: "1.3rem",
              color: "white",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            Commerce Bank
          </Typography>
        </Box>

        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleMenuOpen}
          color="inherit"
          startIcon={<MenuIcon />}
        >
          Menu
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleScheduleAppointment}>
            Schedule an Appointment
          </MenuItem>
          <MenuItem onClick={handleListAppointments}>
            List All Appointments
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
