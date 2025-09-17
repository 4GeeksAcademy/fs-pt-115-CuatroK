import { Link } from "react-router-dom";
import "./icon.css"
import "../../index.css"
import { ChangePassword } from "../../services/serviceApi";
import { useState } from "react";

export const ForgotPassword = () => {
    const [emailInput, setEmailInput] = useState("")
    const [alert, setAlert] = useState("")
    console.log(emailInput)
    const SendEmail = async (e) => {
        e.preventDefault()
        await ChangePassword(emailInput, setAlert)
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%", position: "relative" }}>

                {/* Botón arriba a la izquierda */}
                <Link to="/user/createAccount" className="btn btn-link position-absolute top-0 start-0 mb-3 mt-2">
                    <i className="fa-regular fa-circle-left fa-2x text-black icon-hover"></i>
                </Link>

                <h3 className="text-center mt-4">¿Quieres recuperar tu contraseña?</h3>
                <p className="text-center">
                    Escribe aquí tu correo electrónico y recibirás un link para cambiar tu contraseña
                </p>
                <form onSubmit={SendEmail}>
                    <input type="email" className={`form-control ${!emailInput && alert ? "input-data-missing" : ""} mb-3`} placeholder="Email" onChange={e => setEmailInput(e.target.value)} />
                    {
                        alert && emailInput &&
                        <div className="alert alert-warning text-center" role="alert">
                            {alert}
                        </div>
                    }
                    <button type="submit" className="btn btn-primary w-100">Enviar</button>
                </form>
            </div>
        </div>
    );
}