import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import "../../index.css"
export const InactiveAccount = () => {
    const { logoutUser } = useAuth()
    useEffect(() => {
        localStorage.removeItem("token")
        sessionStorage.removeItem("token")



    }, []);
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg text-center p-5 products-card border-0">
                <div className="mb-4">
                    <i className="fas fa-user-slash fa-5x text-danger"></i>
                </div>
                <h2 className="fw-bold text-dark mb-3">Cuenta Desactivada</h2>
                <p className="text-muted fs-5">
                    Tu cuenta ha sido <strong>bloqueada temporalmente</strong> por un
                    administrador.
                    <br />
                    Si crees que se trata de un error, por favor contacta con el soporte.
                </p>
                <div className="mt-4">
                    <button href="/contact" className="color-buttons text-white px-4">
                        Contactar Soporte
                    </button>
                </div>
            </div>
        </div>
    );
};