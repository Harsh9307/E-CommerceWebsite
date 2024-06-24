// src/protected-route.tsx

import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

// Define the props for the ProtectedRoute component
interface Props {
  children?: ReactElement;
  isAuthenticated: boolean;
  adminOnly?: boolean;
  admin?: boolean;
  redirect?: string;
}

// Functional component for protected routes
const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminOnly,
  admin,
  redirect = "/",
}: Props) => {
  // Redirect if the user is not authenticated
  if (!isAuthenticated) return <Navigate to={redirect} />;

  // Redirect if the route is admin-only and the user is not an admin
  if (adminOnly && !admin) return <Navigate to={redirect} />;

  // Render the children if provided, otherwise render the nested routes
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
