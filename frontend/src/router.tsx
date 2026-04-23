import {
  RootRoute,
  Route,
  Router,
  Outlet,
  Navigate,
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
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useAuth();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      window.location.href = "/login";
    }
  }, [isLoggedIn, isLoading]);

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

// Public layout for login/register
const PublicLayout = () => {
  return <Outlet />;
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

const rootRoute = new RootRoute({
  component: RootComponent,
});

// Public auth routes
const publicRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: PublicLayout,
});

const loginRoute = new Route({
  getParentRoute: () => publicRoute,
  path: "/login",
  component: Login,
});

const registerRoute = new Route({
  getParentRoute: () => publicRoute,
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
  publicRoute.addChildren([loginRoute, registerRoute]),
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
