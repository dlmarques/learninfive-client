import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "./styles/styles.css";
import "./styles/fonts.css";
import reportWebVitals from "./reportWebVitals.ts";
import TopicPage from "./pages/Topic.tsx";
import About from "./pages/About.tsx";
import { getTheme } from "./utils/getSystemTheme.ts";
import { getCurrentThemeClass } from "./utils/getCurrentTheme.ts";
import Provider from "./Provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

if (!localStorage.getItem("theme")) {
  let theme = getTheme();
  localStorage.setItem("theme", theme);
}

const rootRoute = createRootRoute({
  component: () => (
    <div className={`${getCurrentThemeClass()} app`}>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: TopicPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div>loading...</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </QueryClientProvider>
      </Provider>
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
