import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function SaleProtectedRoute({ children }) {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) return <Navigate to="/login" />;

  const roles = currentUser.roles || [];

  if (roles.some((role) => role.name === "warehouse")) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
}
