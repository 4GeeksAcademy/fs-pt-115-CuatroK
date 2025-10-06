import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { resetPassword } from "../../services/serviceApi"

export const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const [passwordInputs, setPasswordInputs] = useState({
        password: "",
        confPassword: ""
    })
    const [error, setError] = useState(false)

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setPasswordInputs({
            ...passwordInputs,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordInputs.password !== passwordInputs.confPassword) {
            setError(true);
            return;
        }

        resetPassword(token, passwordInputs.password)

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                    type="password"
                    className={`form-control ${!passwordInputs.password && error ? "input-data-missing" : ""}`}
                    id="password"
                    name="password"
                    value={passwordInputs.password}
                    onChange={handleOnChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="confPassword" className="form-label">Confirmar contraseña</label>
                <input
                    type="password"
                    className={`form-control ${!passwordInputs.confPassword && error ? "input-data-missing" : ""}`}
                    id="confPassword"
                    name="confPassword"
                    value={passwordInputs.confPassword}
                    onChange={handleOnChange}
                />

            </div>

            <button type="submit" className="btn btn-warning">Cambiar contraseña</button>
        </form>
    )
}