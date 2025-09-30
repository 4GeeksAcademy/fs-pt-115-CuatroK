import { useEffect, useState } from "react";
import { DatosPersonales } from "../../components/admin/DatosPersonales";
import { Seguridad } from "../../components/admin/Seguridad";
import "../../index.css";
import "./profile.css";
import "../../components/admin/profile.css"
import { getUser } from "../../services/serviceApi";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../components/public/LoadingSpinner";
import { Carrito } from "../../components/admin/Carrito";
import { useNavigate } from "react-router-dom";
import { HistorialDePedidos } from "../../components/admin/HistorialDePedidos";
import { Cupones } from "../../components/admin/Cupones";
import { Favoritos } from "../../components/admin/Favoritos";

export const Profile = ({ textOption }) => {
    const [isActive, setIsActive] = useState("Datos personales");
    const { user, token, loading, getUserApi } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (textOption) {
            setIsActive(textOption)
        }
        getUserApi();
        if (user) {
            if (user.msg == 'Token has expired') {
                sessionStorage.removeItem("token");
                return navigate("/")
            }
        }
        if (!token && !loading) {
            return navigate("/")
        }
        console.log(user)
    }, [token]);

    if (!user) {
        return <LoadingSpinner />;
    }

    return (
        <div className=" container-fluid">

            <div className="row justify-content-between ">
                <div className="sidebar col-3 d-flex flex-column justify-content-center align-items-start p-4 shadow-sm h-100 ms-5 mt-5">
                    <h2 className="sidebar-title mb-4 w-100  border-bottom border-dark pb-4 profile-form">Mi Perfil</h2>

                    <button
                        type="button"
                        onClick={(e) => setIsActive(e.target.innerText)}
                        className={`sidebar-item ${isActive == "Datos personales" ? "active" : ""}`}
                    >
                        Datos personales
                    </button>

                    <button
                        type="button"
                        onClick={(e) => setIsActive(e.target.innerText)}
                        className={`sidebar-item ${isActive == "Seguridad" ? "active" : ""}`}
                    >
                        Seguridad
                    </button>

                    <button
                        type="button"
                        onClick={(e) => setIsActive(e.target.innerText)}
                        className={`sidebar-item ${isActive == "Historial de pedidos" ? "active" : ""}`}
                    >
                        Historial de pedidos
                    </button>

                    <button
                        type="button"
                        onClick={(e) => setIsActive(e.target.innerText)}
                        className={`sidebar-item ${isActive == "Carrito" ? "active" : ""}`}
                    >
                        Carrito
                    </button>

                    <button
                        type="button"
                        onClick={(e) => setIsActive(e.target.innerText)}
                        className={`sidebar-item ${isActive == "Cupones" ? "active" : ""}`}
                    >
                        Cupones
                    </button>

                    <button
                        type="button"
                        onClick={(e) => setIsActive(e.target.innerText)}
                        className={`sidebar-item ${isActive == "Favoritos" ? "active" : ""}`}
                    >
                        Favoritos
                    </button>
                </div>

                <div className="col-8 me-5">
                    <h1 className="text-center my-5 profile-form">Hello, {user.username ?? ""} </h1>
                    {isActive == "Datos personales" ? (
                        <DatosPersonales
                            user={user}
                            getUserApi={getUserApi}
                        />
                    ) : isActive == "Seguridad" ? (
                        <Seguridad />
                    ) : isActive == "Historial de pedidos" ? (
                        <HistorialDePedidos />
                    ) : isActive == "Carrito" ? (
                        <Carrito />
                    ) : isActive == "Cupones" ? (
                        <Cupones />
                    ) : <Favoritos />}
                </div>
            </div>
        </div>
    );
};
