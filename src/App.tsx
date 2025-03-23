import ThemeChanger from "./shared/components/theme-changer";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { FaEdit } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import { Outlet } from "@tanstack/react-router";

const App = () => {
  return (
    <div className="app">
      <div
        style={{
          position: "absolute",
          left: "16px",
          top: "16px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
        className="menu"
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
  );
};

export default App;
