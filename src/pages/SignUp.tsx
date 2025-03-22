import { RedirectToSignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return <RedirectToSignUp redirectUrl="/complete-profile" />;
};

export default SignUpPage;
