import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
