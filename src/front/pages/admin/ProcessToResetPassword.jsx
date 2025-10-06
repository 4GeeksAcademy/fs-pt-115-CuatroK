import { useState } from "react";
import { useAuth } from "../../hooks/useAuth"
import { ChangePassword } from "../../services/serviceApi"

export const ProccessToResetPassword = () => {
    const { user } = useAuth();

    const handleSendEmail = async () => {
        await ChangePassword(user.email)
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100" style={{ backgroundColor: "#f5f0e6" }}>

            {/* Encabezado */}
            <h2 className="mb-3 fw-bold text-center" style={{ color: "#7a1f3d" }}>
                Cambiar contraseña
            </h2>
            <p className="text-center mb-4 px-3" style={{ color: "#4a4a4a", maxWidth: "480px" }}>
                Haz clic en el siguiente botón y te enviaremos un correo electrónico con los pasos para actualizar tu contraseña.
            </p>

            {/* Botón */}
            <div className="d-grid" style={{ maxWidth: "320px", width: "100%" }}>
                <button
                    className="btn fw-semibold text-white"
                    style={{ backgroundColor: "#c2a15d", borderColor: "#c2a15d" }}
                    onClick={handleSendEmail}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#b8954f")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#c2a15d")}
                >
                    Enviarme las instrucciones
                </button>
            </div>
        </div>
    );
};