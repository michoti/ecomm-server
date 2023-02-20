import { Navigate, Outlet, Link } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import { useAuthContext } from "../context/AuthContext";

const AuthLayout = () => {
  const { user} = useAuthContext();

    if(!user) {
      return <Navigate to='/login' />
    }

  return (
    <>
      <TopNavBar />
      <Outlet />
    </>
  ) 
};

export default AuthLayout;
