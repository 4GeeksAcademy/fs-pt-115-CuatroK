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
        <div className="vh-100 ">

            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: "700px",
                    margin: "100px auto",
                    padding: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "14px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                }}
            >
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" style={{ fontWeight: 600 }}>
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className={`form-control ${!passwordInputs.password && error ? "input-data-missing" : ""}`}
                        id="password"
                        name="password"
                        value={passwordInputs.password}
                        onChange={handleOnChange}
                        style={{
                            backgroundColor: "#fff",
                            border: "1px solid #efefef",
                            borderRadius: "6px",
                            padding: "0.5rem 0.75rem",
                            width: "100%",
                            marginBottom: "12px",
                            outline: "none",
                        }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="confPassword" className="form-label" style={{ fontWeight: 600 }}>
                        Confirmar contraseña
                    </label>
                    <input
                        type="password"
                        className={`form-control ${!passwordInputs.confPassword && error ? "input-data-missing" : ""}`}
                        id="confPassword"
                        name="confPassword"
                        value={passwordInputs.confPassword}
                        onChange={handleOnChange}
                        style={{
                            backgroundColor: "#fff",
                            border: "1px solid #efefef",
                            borderRadius: "6px",
                            padding: "0.5rem 0.75rem",
                            width: "100%",
                            marginBottom: "20px",
                            outline: "none",
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-warning"
                    style={{
                        backgroundColor: "#e0182d",
                        borderColor: "#e0182d",
                        color: "#fff",
                        fontWeight: 600,
                        width: "100%",
                        padding: "0.6rem",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease, transform 0.2s ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#b2151f"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "#e0182d"}
                >
                    Cambiar contraseña
                </button>
            </form>
        </div>
    )
}