import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import "../../index.css"

export const CreateAccount = () => {
    const { registerUser, loading, error, setError, loginUsingGoogle } = useAuth()

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
        if (inputValue.email.trim().length < 6 || inputValue.email.includes("@") || inputValue.email.includes(".com") && inputValue.password.trim().length < 5 && inputValue.username.trim().length < 3) {
            await registerUser(inputValue, navigate)
        }
        else {
            setError("Faltan datos por rellenar")
        }
    };

    useEffect(() => {
        setError("")
    }, [])

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
            <div className="container products-card">
                <button
                    className="btn btn-link border-0 h-50 text-light mt-2"
                    onClick={() => navigate("/login")}
                >
                    <i className="fa-solid fa-circle-arrow-left fa-3x"></i>
                </button>
                <div className="row">
                    <div className="col-md-12 text-center mt-2">
                        <h1>Crear una cuenta</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 text-center">
                        <h5>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></h5>
                    </div>
                </div>

                <div className="row mt-4">
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
                                {error && inputValue.email.trim().length < 6 && (
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

                            <div className="text-center pb-4" style={{ borderBottom: "4px solid #ffffffff" }}>
                                <button type="submit" className="btn btn-warning">
                                    {loading ? "Cargando..." : "Registrarse"}
                                </button>
                            </div>
                            <div className="text-center">
                                <div className="google-button">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth={0}
                                        version="1.1"
                                        x="0px"
                                        y="0px"
                                        className="google-icon"
                                        viewBox="0 0 48 48"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill="#FFC107"
                                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
  c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
  c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                        />
                                        <path
                                            fill="#FF3D00"
                                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
  C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                        />
                                        <path
                                            fill="#4CAF50"
                                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
  c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                        />
                                        <path
                                            fill="#1976D2"
                                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
  c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                        />
                                    </svg>
                                    <span onClick={loginUsingGoogle}>Log in with Google</span>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}