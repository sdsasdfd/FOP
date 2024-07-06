import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return currentUser ? <Outlet /> : <Navigate to={`/`} />;
};
