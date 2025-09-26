import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export function ProfileLayout() {
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user && !user.is_active) {
            navigate("/inactiveAccount")
        }
    }, [user, navigate])
    return (
        <>

            <Navbar />
            <Outlet />
        </>
    )

}