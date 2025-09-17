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
        await registerUser(inputValue, navigate)
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

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Nombre de usuario</label>
                            <input
                                type="text"
                                className={`form-control ${!inputValue.username && error ? "input-data-missing" : ""}`}
                                id="username"
                                name="username"
                                value={inputValue.username}
                                onChange={handleOnChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo electronico</label>
                            <input
                                type="email"
                                className={`form-control ${!inputValue.email && error ? "input-data-missing" : ""}`}
                                id="email"
                                name="email"
                                value={inputValue.email}
                                onChange={handleOnChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className={`form-control ${!inputValue.password && error ? "input-data-missing" : ""}`}
                                id="password"
                                name="password"
                                value={inputValue.password}
                                onChange={handleOnChange}
                            />

                        </div>

                        <div className="mb-3">
                            <label htmlFor="confPassword" className="form-label">Confirmar contraseña</label>
                            <input
                                type="password"
                                className={`form-control ${!inputValue.confPassword && error ? "input-data-missing" : ""}`}
                                id="confPassword"
                                name="confPassword"
                                value={inputValue.confPassword}
                                onChange={handleOnChange}
                            />
                            <div className="text-center mt-2">
                                <Link to="/forgot-password">
                                    <small className="text-primary" style={{ cursor: "pointer" }}>
                                        ¿Has olvidado tu contraseña?
                                    </small>
                                </Link>
                            </div>

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