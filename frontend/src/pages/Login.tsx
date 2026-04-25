import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "@tanstack/react-router";

const Login = () => {
  const router = useRouter();
  const {
    login: authLogin,
    error: authError,
    isLoading,
    isLoggedIn,
  } = useAuth();

  // Redirect to home if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.navigate({ to: "/home" });
    }
  }, [isLoggedIn, router]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    let isValid = true;

    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (validate()) {
      try {
        await authLogin(username, password);
        // Navigate using React Router (no full page reload)
        await router.navigate({ to: "/home" });
      } catch {
        // Error is handled by AuthContext and displayed in authError
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading && username && password) {
      handleLogin();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f4f7fb 0%, #e9eef5 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 6,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 460,
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          border: "1px solid #d9e2ec",
          boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
          backgroundColor: "#ffffff",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 16px 50px rgba(15, 23, 42, 0.12)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#e8f1fb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <AccountBalanceIcon sx={{ color: "#1565c0", fontSize: 32 }} />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#0f172a",
              textAlign: "center",
              mb: 1,
            }}
          >
            Commerce Bank
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#475569",
              textAlign: "center",
            }}
          >
            Sign in to access your banking dashboard
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            error={!!usernameError}
            helperText={usernameError}
            placeholder="Enter your username"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "&:hover fieldset": {
                  borderColor: "#1565c0",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1565c0",
                  boxShadow: "0 0 0 2px rgba(21, 101, 192, 0.15)",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon sx={{ color: "#64748b" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            error={!!passwordError}
            helperText={passwordError}
            placeholder="Enter your password"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "&:hover fieldset": {
                  borderColor: "#1565c0",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1565c0",
                  boxShadow: "0 0 0 2px rgba(21, 101, 192, 0.15)",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: "#64748b" }} />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: -1 }}>
            <Link
              href="#"
              underline="hover"
              sx={{
                color: "#1565c0",
                fontWeight: 500,
                fontSize: "0.95rem",
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          {authError && (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {authError}
            </Alert>
          )}

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            disabled={isLoading}
            sx={{
              mt: 1,
              py: 1.4,
              borderRadius: 2.5,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 700,
              backgroundColor: "#1565c0",
              boxShadow: "none",
              transition: "all 0.25s ease",
              "&:hover": {
                backgroundColor: "#0d47a1",
                transform: "translateY(-1px)",
                boxShadow: "0 10px 25px rgba(21, 101, 192, 0.3)",
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>

          <Alert
            severity="info"
            sx={{
              mt: 1,
              borderRadius: 2,
              backgroundColor: "#f8fbff",
            }}
          >
            Your session is protected with secure banking-grade access controls.
          </Alert>

          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "#64748b",
              mt: 1,
            }}
          >
            New to Commerce Bank?{" "}
            <Link
              href="/register"
              underline="hover"
              sx={{
                color: "#1565c0",
                fontWeight: 600,
              }}
            >
              Create Account
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
