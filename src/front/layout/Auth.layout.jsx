import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function AuthLayout() {
    const { user } = useAuth()
    if (user) {
        return <Navigate to={"/"}></Navigate>
    }
    return (
        <>
            <Outlet />
        </>
    )

}