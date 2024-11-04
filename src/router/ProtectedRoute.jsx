import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";


const ProtectedRoute = ({ children }) => {
    const user = useSelector(selectUser);

    return user ? children : <Navigate to={"/login"} replace />
}

export default ProtectedRoute;