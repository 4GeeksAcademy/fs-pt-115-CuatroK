import "bootstrap/dist/css/bootstrap.min.css";
import { getAllUsers, updateUserState } from "../../../services/serviceApi";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import "./isAdminCss/userList.css"
import LoadingSpinner from "../../../components/public/LoadingSpinner";

export const UserList = () => {
    const { token } = useAuth()
    const [users, setUsers] = useState()
    const [loading, setLoading] = useState()

    const getUsersAsync = async () => {
        const data = await getAllUsers(token)
        setUsers(data)
    }

    const changeUserStatus = async (bool, id) => {
        await updateUserState(bool, id, setLoading)
        getUsersAsync()
    }

    useEffect(() => {
        getUsersAsync()
    }, [])

    if (!users || users.length === 0) {
        return <LoadingSpinner />
    }

    return (
        <div className=" min-vh-100">
            <h2 className="text-center my-3">Lista de usuario</h2>
            {loading && (
                <div className="loading-overlay d-flex justify-content-center align-items-center">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            )}

            <div className="container">
                <div className="d-flex flex-column gap-4">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="card products-card-admin-list shadow border-0 p-2"
                        >
                            <div className="card-body">
                                {/* Encabezado */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h3 className="fw-bold text-dark mb-0">
                                        Nombre: {user.full_name ? user.full_name : "Sin identificar"}
                                    </h3>
                                    <span className="badge bg-secondary fs-6">
                                        @{user.username || "Sin usuario"}
                                    </span>
                                </div>

                                {/* Info principal */}
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <p className="mb-2">
                                            <strong>Email:</strong> {user.email}
                                        </p>
                                        <p className="mb-2">
                                            <strong>Género:</strong>{" "}
                                            {user.gender || "No especificado"}
                                        </p>
                                        <p className="mb-2">
                                            <strong>Nacimiento:</strong>{" "}
                                            {user.birth_date || "No disponible"}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="mb-2">
                                            <strong>Admin:</strong>{" "}
                                            {user.is_admin ? "Sí" : " No"}
                                        </p>
                                    </div>
                                </div>

                                {/* Direcciones */}
                                {user.address && user.address.length > 0 && (
                                    <div className="mb-3">
                                        <h5 className="fw-bold">Direcciones</h5>
                                        <ul className="ps-3">
                                            {user.address.map((addr, i) => (
                                                <li key={i}>
                                                    {addr.first_address}, {addr.city} ({addr.postal_code})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Favoritos */}
                                {user.favorites && user.favorites.length > 0 && (
                                    <div className="mb-3">
                                        <h5 className="fw-bold">Favoritos</h5>
                                        <ul className="ps-3">
                                            {user.favorites.map((fav, i) => (
                                                <li key={i}>{fav.name || "Elemento favorito"}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Acciones */}
                                {
                                    !user.is_admin ? (
                                        <div className="text-end">
                                            <button
                                                className={`btn ${user.is_active
                                                    ? "color-buttons-admin-list-desactivar"
                                                    : "color-buttons-admin-list-reactivar"
                                                    } text-white fw-bold px-2`}
                                                onClick={() => changeUserStatus(!user.is_active, user.id)}
                                            >
                                                {user.is_active ? "Desactivar cuenta" : "Reactivar cuenta"}
                                            </button>
                                        </div>) :
                                        <div className="text-end">
                                            <h5>Admin</h5>
                                        </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};