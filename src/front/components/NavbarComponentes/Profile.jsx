import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export const Profile = () => {
    const { token, logoutUser } = useAuth()
    const [open, setOpen] = useState(false)

    if (!token) return <Link to="/login" className="text-dark">Iniciar Sesión</Link>

    return (
        <div className="position-relative text-end">
            <button
                className="btn btn-outline-light mt-2 border-dark"
                style={{ width: 50, height: 50 }}
                onClick={() => setOpen(!open)}
            >
                <i className="fa-sharp fa-regular fa-circle-user text-dark"></i>
            </button>

            {open && (
                <ul
                    className="dropdown-menu dropdown-menu-end show"
                    style={{ position: "absolute", right: 0 }}
                >
                    <li><Link className="dropdown-item" to="/user">Perfil</Link></li>
                    <li><a className="dropdown-item" href="#">Configuración</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={logoutUser}>Cerrar sesión</button></li>
                </ul>
            )}
        </div>
    )
}