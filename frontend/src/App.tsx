import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppointmentProvider } from "./context/AppointmentContext";
import { AuthProvider } from "./context/AuthContext";
import { router } from "./router";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppointmentProvider>
          <RouterProvider router={router} />
        </AppointmentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
