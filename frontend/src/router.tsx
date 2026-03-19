import { RootRoute, Route, Router, Outlet } from "@tanstack/react-router";
import { TopBar } from "./components/TopBar";
import { HomePage } from "./routes/HomePage";
import { SchedulePage } from "./routes/SchedulePage";
import { AppointmentsPage } from "./routes/AppointmentsPage";

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

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const scheduleRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/schedule/step1",
  component: SchedulePage,
});

const appointmentsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/appointments",
  component: AppointmentsPage,
});

// Wildcard route for /schedule paths
const scheduleWildcardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/schedule/$step",
  component: SchedulePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  scheduleRoute,
  scheduleWildcardRoute,
  appointmentsRoute,
]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
