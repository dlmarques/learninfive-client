import ThemeChanger from "../theme-changer";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { FaEdit } from "react-icons/fa";
import { Button } from "@chakra-ui/react";

const Header = () => {
  return (
    <div className="menu">
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
  );
};

export default Header;
