import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { logout } from "../stores/slices/authSlice";
import { useEffect, useState } from "react";


const ProtectedRoute = ({ allowedRoles }) => {

    const location = useLocation();
    const dispatch = useDispatch();
    const [forceLogout, setForceLogout] = useState(false);
    const { user } = useSelector((state) => state.auth);

    console.log(user);

    useEffect(() => {
        // Kiểm tra xem user trong localStorage có tồn tại không
        const storedUser = localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null;

        console.log("stotedUser", storedUser);

        // Nếu user trong localStorage không tồn tại nhưng Redux vẫn có user, đăng xuất
        if (!storedUser && user) {
            dispatch(logout()); // xóa trạng thái Redux
            setForceLogout(true);
        }
    }, [location, user, dispatch]);

    // Buột đăng xuất
    if (forceLogout) {
        return <Navigate to={allowedRoles.includes("STUDENT") ? "/portal" : "/admin"} replace />;
      }

    // Nếu chưa đăng nhập -> chuyển hướng về trang đăng nhập
    if (!user) {
        return <Navigate to={allowedRoles.includes("STUDENT") ? "/portal" : "/admin"} replace />
    }

    // Nếu không có role tương ứng -> điều hướng về trang 404
    if (!allowedRoles.includes(user.role)) {
        console.log("unauthenticated");
        console.log(allowedRoles, user.role);

        return <Navigate to={"/not-found"} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;