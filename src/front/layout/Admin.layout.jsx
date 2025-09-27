import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/public/LoadingSpinner";
import { AdminNavbar } from "../pages/admin/isAdmin/AdminNavbar";
import { useEffect } from "react";

export function AdminLayout() {
    const { user, getUserApi } = useAuth()
    useEffect(() => {
        getUserApi()
    }, [])

    console.log(user)
    if (!user) {
        return <LoadingSpinner />
    }

    else if (!user.is_admin) {
        return <h1>No eres admin</h1>
    }
    return (
        <>
            <AdminNavbar />
            <Outlet />
        </>
    )
}