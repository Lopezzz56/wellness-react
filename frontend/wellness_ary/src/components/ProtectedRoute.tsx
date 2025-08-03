// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("❌ No token found. Redirecting to /auth");
    return <Navigate to="/auth" replace />;
  }

  console.log("✅ Token exists. Rendering protected route");
  return <>{children}</>;
};

export default ProtectedRoute;
