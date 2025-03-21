import { createRootRoute, createRoute, redirect } from "@tanstack/react-router";
import App from "./App";
import { isUserProfileCompleted } from "./utils/isUserProfileCompleted";
import TopicPage from "./pages/Topic";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import CompleteProfilePage from "./pages/CompleteProfile";
import EditProfilePreferencesPage from "./pages/EditProfilePreferences";
import About from "./pages/About";
import License from "./pages/License";
import ErrorPage from "./pages/Error";

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
