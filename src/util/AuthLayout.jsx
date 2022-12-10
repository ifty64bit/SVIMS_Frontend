import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AuthLayout() {
    const nav = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            nav("/login");
        }
    }, []);
    return <Outlet />;
}

export default AuthLayout;
