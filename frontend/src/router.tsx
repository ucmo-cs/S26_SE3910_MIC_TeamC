import {
  RootRoute,
  Route,
  Router,
  Outlet,
  Navigate,
  useNavigate,
} from "@tanstack/react-router";
import { TopBar } from "./components/TopBar";
import { HomePage } from "./routes/HomePage";
import { SchedulePage } from "./routes/SchedulePage";
import { AppointmentsPage } from "./routes/AppointmentsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

// Protected route component - redirects to login if not authenticated
const ProtectedLayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate({ to: "/login" });
    }
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <TopBar />
      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

// Public layout for login/register - redirects authenticated users to home
const PublicLayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigate({ to: "/home" });
    }
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

// Root redirect - sends unauthenticated users to login, authenticated to home
const RootRedirect = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn) {
        navigate({ to: "/home" });
      } else {
        navigate({ to: "/login" });
      }
    }
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return null;
};

const RootComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <Outlet />
    </div>
  );
};

const rootRoute = new RootRoute({
  component: RootComponent,
});

// Root index route - redirects based on auth
const rootIndexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: RootRedirect,
});

// Login route
const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

// Register route with public layout
const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});

// Protected routes
const protectedRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: ProtectedLayout,
});

const indexRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: "/",
  component: HomePage,
});

const scheduleRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: "/schedule/step1",
  component: SchedulePage,
});

const appointmentsRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: "/appointments",
  component: AppointmentsPage,
});

const scheduleWildcardRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: "/schedule/$step",
  component: SchedulePage,
});

const routeTree = rootRoute.addChildren([
  rootIndexRoute,
  loginRoute,
  registerRoute,
  protectedRoute.addChildren([
    indexRoute,
    scheduleRoute,
    scheduleWildcardRoute,
    appointmentsRoute,
  ]),
]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
