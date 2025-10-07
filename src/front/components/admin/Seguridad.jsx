import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import "./profile.css"

export const Seguridad = () => {
    const { user, token } = useAuth()
    return (
        <>
            <div className="profile-form container p-4">
                <div className="row  px-4">
                    <div className="col-6">
                        <h4>Correo</h4>
                        <div class="input-group input-group-sm mb-3">
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={user.email ?? ""} disabled />
                        </div>
                    </div>
                    <div className="col-6 ms-auto">
                        <h4>Contraseña</h4>
                        <div class="input-group input-group-sm">
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled value={"************"} />
                        </div>
                        <Link to={`/reset-password-form?token=${token}`}>
                            <small
                                className="text-primary"
                                style={{ cursor: "pointer" }}

                            >
                                ¿Quieres cambiar tu contraseña?
                            </small>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}