import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export const Seguridad = () => {
    const { user } = useAuth()
    return (
        <>
            <div className="products-card container p-4">
                <div className="row  px-4">
                    <div className="col-6">
                        <h3>Correo</h3>
                        <div class="input-group input-group-sm mb-3">
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={user.email ?? ""} disabled />
                        </div>
                    </div>
                    <div className="col-6 ms-auto">
                        <h3>Contraseña</h3>
                        <div class="input-group input-group-sm">
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled value={"************"} />
                        </div>
                        <Link to={"/reset-password"}>
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