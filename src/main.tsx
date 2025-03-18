// Copyright (c) 2025 Daniel Marques
// Licensed under the GNU AGPL v3. See LICENSE.

import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./styles/styles.css";
import "./styles/fonts.css";
import reportWebVitals from "./reportWebVitals.ts";
import Provider from "./Provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { routeTree } from "./routes.ts";
import { setupInterceptors } from "./utils/interceptors.ts";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

setupInterceptors();

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

const WrappedRouter = () => {
  const { getToken } = useAuth();
  return (
    <RouterProvider
      router={router}
      context={{
        token: async () => {
          return await getToken();
        },
      }}
    />
  );
};

const App = () => {
  return (
    <StrictMode>
      <Provider>
        <QueryClientProvider client={queryClient}>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <Suspense fallback={<div>loading...</div>}>
              <WrappedRouter />
              <Toaster />
            </Suspense>
          </ClerkProvider>
        </QueryClientProvider>
      </Provider>
    </StrictMode>
  );
};

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
