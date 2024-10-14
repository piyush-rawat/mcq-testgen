import { useAuthStore } from "@/store";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const { access_token } = useAuthStore();

  return access_token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
