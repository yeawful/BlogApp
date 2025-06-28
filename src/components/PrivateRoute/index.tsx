import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/store";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const { user } = useAppSelector((state) => state.user);

    if (!user) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
