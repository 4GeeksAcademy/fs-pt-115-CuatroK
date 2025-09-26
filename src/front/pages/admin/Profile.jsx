import { useEffect, useState } from "react";
import { DatosPersonales } from "../../components/admin/DatosPersonales";
import { Seguridad } from "../../components/admin/Seguridad";
import "../../index.css";
import "./profile.css";
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
    }, []);

    if (!user) {
        return <LoadingSpinner />;
    }

    return (
        <div className="mt-5 container-fluid ">
            <h1 className="text-center my-5">Hello, {user.username ?? ""} </h1>
            <div className="row justify-content-center gap-5 ">
                <div
                    className="list-group  col-3 border border-dark p-0"
                    style={{ height: "100%" }}
                >
                    <button
                        type="button"
                        onClick={(e) => setIsActive(e.target.innerText)}
                        className={`list-group-item list-group-item-action border-bottom border-end-0 border-start-0 border-secondary fs-3 profile-options-background ${isActive == "Datos personales" ? "active" : ""
                            }`}
                    >
                        Datos personales
                    </button>
                    <button
                        type="button"
                        onClick={(e) => setIsActive(e.target.innerText)}
                        className={`list-group-item list-group-item-action border-bottom border-end-0 border-start-0 border-secondary fs-3 profile-options-background ${isActive == "Seguridad" ? "active" : ""
                            }`}
                    >
                        Seguridad
                    </button>
                    <button
                        type="button"
                        onClick={(e) => setIsActive(e.target.innerText)}
                        className={`list-group-item list-group-item-action border-bottom border-end-0 border-start-0 border-secondary fs-3 profile-options-background ${isActive == "Historial de pedidos" ? "active" : ""
                            }`}
                    >
                        Historial de pedidos
                    </button>
                    <button
                        type="button"
                        onClick={(e) => setIsActive(e.target.innerText)}
                        className={`list-group-item list-group-item-action border-bottom border-end-0 border-start-0 border-secondary fs-3 profile-options-background ${isActive == "Carrito" ? "active" : ""
                            }`}
                    >
                        Carrito
                    </button>
                    <button
                        type="button"
                        onClick={(e) => setIsActive(e.target.innerText)}
                        className={`list-group-item list-group-item-action border-bottom border-end-0 border-start-0 border-secondary fs-3 profile-options-background ${isActive == "Cupones" ? "active" : ""
                            }`}
                    >
                        Cupones
                    </button>
                    <button
                        type="button"
                        onClick={(e) => setIsActive(e.target.innerText)}
                        className={`list-group-item list-group-item-action fs-3 profile-options-background ${isActive == "Favoritos" ? "active" : ""
                            }`}
                    >
                        Favoritos
                    </button>
                </div>

                <div className="col-8 ">
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
