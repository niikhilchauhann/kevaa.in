import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("auth") === "true"; // Simplified auth check
};

export default function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" />;
}
