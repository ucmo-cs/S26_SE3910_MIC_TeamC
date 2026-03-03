import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppointmentProvider } from "./context/AppointmentContext";
import { router } from "./router";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppointmentProvider>
        <RouterProvider router={router} />
      </AppointmentProvider>
    </ThemeProvider>
  );
}

export default App;
