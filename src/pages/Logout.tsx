import { useSignOut } from "react-auth-kit";

const LogoutPage = () => {
  const signOut = useSignOut();

  signOut();

  return null;
};

export default LogoutPage;
