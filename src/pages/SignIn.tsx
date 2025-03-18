import { RedirectToSignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return <RedirectToSignIn redirectUrl="/complete-profile" />;
};

export default SignInPage;
