// Copyright (c) 2025 Daniel Marques
// Licensed under the GNU AGPL v3. See LICENSE.

import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import "./styles/styles.css";
import "./styles/fonts.css";
import reportWebVitals from "./reportWebVitals.ts";
import TopicPage from "./pages/Topic.tsx";
import About from "./pages/About.tsx";
import License from "./pages/License.tsx";
import Provider from "./Provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeChanger from "./shared/components/theme-changer/index.tsx";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "@chakra-ui/react";
import SignInPage from "./pages/SignIn.tsx";
import SignUpPage from "./pages/SignUp.tsx";
import CompleteProfilePage from "./pages/CompleteProfile.tsx";
import { isUserProfileCompleted } from "./utils/isUserProfileCompleted.ts";
import { Toaster } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import EditProfilePreferencesPage from "./pages/EditProfilePreferences.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const rootRoute = createRootRoute({
  component: () => (
    <div className={`app`}>
      <div
        style={{
          position: "absolute",
          left: "16px",
          top: "16px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <ThemeChanger />
        <SignedIn>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Edit profile preferences"
                labelIcon={<FaEdit />}
                onClick={() => {
                  window.location.assign("/edit-profile-preferences");
                }}
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
        <SignedOut>
          <Button onClick={() => window.location.assign("/sign-in")}>
            <p style={{ fontSize: "14px", fontWeight: "500" }}>Sign in</p>
          </Button>
        </SignedOut>
      </div>
      <Outlet />
    </div>
  ),
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
    if (token) {
      const hasCompletedProfile = await isUserProfileCompleted(token);
      if (hasCompletedProfile) {
        return redirect({ to: "/" });
      }
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

const routeTree = rootRoute.addChildren([
  indexRoute,
  singInRoute,
  signUpRoute,
  completeProfileRoute,
  editProfilePreferencesRoute,
  aboutRoute,
  licenseRoute,
]);

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
