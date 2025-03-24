// Copyright (c) 2025 Daniel Marques
// Licensed under the GNU AGPL v3. See LICENSE.

import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import "./styles/styles.css";
import "./styles/fonts.css";
import reportWebVitals from "./reportWebVitals.ts";
import Provider from "./Provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { setupInterceptors } from "./utils/interceptors.ts";
import License from "./pages/License.tsx";
import About from "./pages/About.tsx";
import EditProfilePreferencesPage from "./pages/EditProfilePreferences.tsx";
import CompleteProfilePage from "./pages/CompleteProfile.tsx";
import SignUpPage from "./pages/SignUp.tsx";
import SignInPage from "./pages/SignIn.tsx";
import ErrorPage from "./pages/Error.tsx";
import TopicPage from "./pages/Topic.tsx";
import { isUserProfileCompleted } from "./utils/isUserProfileCompleted.ts";
import App from "./App.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

setupInterceptors();

const rootRoute = createRootRoute({
  component: App,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: async ({ context }: { context: any }) => {
    const token = await context.token();
    if (token) {
      const hasCompletedProfile = await isUserProfileCompleted(token);
      if (!hasCompletedProfile) {
        return redirect({ to: "/complete-profile" });
      }
    }
  },
  component: TopicPage,
});

const errorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/error",
  component: ErrorPage,
});

const singInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-in",
  component: SignInPage,
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-up",
  component: SignUpPage,
});

const completeProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/complete-profile",
  beforeLoad: async ({ context }: { context: any }) => {
    const token = await context.token();
    if (!token) return redirect({ to: "/" });

    const hasCompletedProfile = await isUserProfileCompleted(token);
    if (hasCompletedProfile) {
      return redirect({ to: "/" });
    }
  },
  component: CompleteProfilePage,
});

const editProfilePreferencesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/edit-profile-preferences",
  beforeLoad: async ({ context }: { context: any }) => {
    const token = await context.token();
    if (token) {
      const hasCompletedProfile = await isUserProfileCompleted(token);
      if (!hasCompletedProfile) {
        return redirect({ to: "/complete-profile" });
      }
    }
  },
  component: EditProfilePreferencesPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const licenseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/license",
  component: License,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  singInRoute,
  signUpRoute,
  completeProfileRoute,
  editProfilePreferencesRoute,
  aboutRoute,
  licenseRoute,
  errorRoute,
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
});

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

const Main = () => {
  return (
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
  );
};

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<Main />);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
