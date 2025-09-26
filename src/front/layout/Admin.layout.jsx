import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/public/LoadingSpinner";
import { AdminNavbar } from "../pages/admin/isAdmin/AdminNavbar";

export function AdminLayout() {
    const { user } = useAuth()

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