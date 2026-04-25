import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";

export const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const open = Boolean(anchorEl);
  const userMenuOpen = Boolean(userMenuAnchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = async () => {
    handleUserMenuClose();
    await logout();
    window.location.href = "/login";
  };

  const handleLoginClick = () => {
    navigate({ to: "/login" });
    handleMenuClose();
  };

  const handleRegisterClick = () => {
    navigate({ to: "/register" });
    handleMenuClose();
  };

  const handleHomeClick = () => {
    navigate({ to: "/" });
    handleMenuClose();
  };

  const handleSchedule = () => {
    navigate({ to: "/home/schedule/step1" });
    handleMenuClose();
  };

  const handleAppointments = () => {
    navigate({ to: "/home/appointments" });
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
              sx={{
                fontWeight: 700,
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

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {currentUser ? (
            <>
              <Button
                onClick={handleMenuOpen}
                color="inherit"
                startIcon={<MenuIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.12)",
                  },
                }}
              >
                Menu
              </Button>

              <Button
                onClick={handleUserMenuOpen}
                color="inherit"
                startIcon={<AccountCircleIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.12)",
                  },
                }}
              >
                {currentUser.username}
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleLoginClick}
                color="inherit"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.12)",
                  },
                }}
              >
                Login
              </Button>

              <Button
                onClick={handleRegisterClick}
                color="inherit"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.12)",
                  },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
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
          <MenuItem onClick={handleSchedule}>Schedule Appointment</MenuItem>
          <MenuItem onClick={handleAppointments}>View Appointments</MenuItem>
        </Menu>

        <Menu
          anchorEl={userMenuAnchorEl}
          open={userMenuOpen}
          onClose={handleUserMenuClose}
          PaperProps={{
            elevation: 4,
            sx: {
              mt: 1,
              borderRadius: 2,
              minWidth: 200,
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
            },
          }}
        >
          <MenuItem disabled sx={{ color: "rgba(0,0,0,0.6)" }}>
            Signed in as&nbsp;
            <strong>{`${currentUser?.name}`}</strong>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: "#d32f2f" }}>
            <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
