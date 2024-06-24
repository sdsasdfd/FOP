import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const { currentUser } = useSelector((state) => state?.user);
  return currentUser ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectRoute;
