import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import "../../index.css"

export const CreateAccount = () => {
    const { registerUser, loading, error, setError } = useAuth()
    const [inputValue, setInputValue] = useState({
        username: "",
        email: "",
        password: "",
        confPassword: ""
    });
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputValue.email.trim().length < 6 || !inputValue.email.includes("@") || !inputValue.email.includes(".com")) {
            await registerUser(inputValue, navigate)

        }
    };

    useEffect(() => {
        setError("")
    }, [])

    console.log(inputValue)

    return (
        <div className="container products-card">
            <div className="row">
                <div className="col-md-12 text-center mt-5">
                    <h1>Crear una cuenta</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 text-center">
                    <h5>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></h5>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3 position-relative">
                            <label htmlFor="username" className="form-label">Nombre de usuario</label>
                            <input
                                type="text"
                                className={`form-control ${error && inputValue.username.trim().length < 3 ? "input-data-missing" : ""}`}
                                id="username"
                                name="username"
                                value={inputValue.username}
                                onChange={handleOnChange}
                            />
                            {error && inputValue.username.trim().length < 3 && (
                                <div
                                    className="bg-danger  text-white p-2 rounded"
                                    style={{
                                        position: "absolute",
                                        top: "100%", // justo debajo del input
                                        left: 0,
                                        zIndex: 10,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    <i className="fa-solid fa-circle-exclamation me-1"></i>
                                    Tu nombre de usuario debe tener al menos 3 caracteres
                                </div>
                            )}
                        </div>

                        <div className="mb-3 position-relative">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input
                                type="text"
                                className={`form-control ${error && (inputValue.email.trim().length < 6 || !inputValue.email.includes("@")) ? "input-data-missing" : ""}`}
                                id="email"
                                name="email"
                                value={inputValue.email}
                                onChange={handleOnChange}
                            />
                            {error && (inputValue.email.trim().length < 6 || !inputValue.email.includes("@")) || !inputValue.email.includes(".com") && (
                                <div
                                    className="bg-danger text-white p-2 rounded"
                                    style={{ position: "absolute", top: "100%", left: 0, zIndex: 10, whiteSpace: "nowrap" }}
                                >
                                    <i className="fa-solid fa-circle-exclamation me-1"></i>
                                    Ingresa un correo válido con @ y .com
                                </div>
                            )}
                        </div>

                        <div className="mb-3 position-relative">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className={`form-control ${error && inputValue.password.trim().length < 5 ? "input-data-missing" : ""}`}
                                id="password"
                                name="password"
                                value={inputValue.password}
                                onChange={handleOnChange}
                            />
                            {error && inputValue.password.trim().length < 5 && (
                                <div
                                    className="bg-danger text-white p-2 rounded"
                                    style={{ position: "absolute", top: "100%", left: 0, zIndex: 10, whiteSpace: "nowrap" }}
                                >
                                    <i className="fa-solid fa-circle-exclamation me-1"></i>
                                    Tu contraseña debe tener al menos 5 caracteres
                                </div>
                            )}
                        </div>

                        <div className="mb-3 position-relative">
                            <label htmlFor="confPassword" className="form-label">Confirmar contraseña</label>
                            <input
                                type="password"
                                className={`form-control ${error && inputValue.confPassword !== inputValue.password ? "input-data-missing" : ""}`}
                                id="confPassword"
                                name="confPassword"
                                value={inputValue.confPassword}
                                onChange={handleOnChange}
                            />
                            {error && inputValue.confPassword !== inputValue.password && (
                                <div
                                    className="bg-danger text-white p-2 rounded"
                                    style={{ position: "absolute", top: "100%", left: 0, zIndex: 10, whiteSpace: "nowrap" }}
                                >
                                    <i className="fa-solid fa-circle-exclamation me-1"></i>
                                    Las contraseñas no coinciden
                                </div>
                            )}
                        </div>

                        {error &&
                            <div className="alert alert-danger text-center" role="alert">
                                {error}
                            </div>
                        }

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                {loading ? "Cargando..." : "Registrarse"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}