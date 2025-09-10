import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../../../index.css"
import { useAuth } from "../../../hooks/useAuth"

export const Login = () => {
    const { loginUser, loading, error, setError } = useAuth()
    const [inputValue, setInputValue] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setInputValue({
            ...inputValue,
            [name]: value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        loginUser(inputValue, navigate)
        console.log(inputValue)
        
    }

    useEffect(() => {
        setError("")
    }, [])

    return (
        <div>
            <div className="container products-card">

                <div className="row">
                    <div className="col-md-12 text-center mt-5">
                        <h1>Iniciar Sesión</h1>
                    </div>
                    <div className="col-md-12 text-center">
                        <h5>¿No te has creado una cuenta? <br /> <Link to="/user/createAccount">Registrate</Link></h5>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <form onSubmit={handleOnSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo Electrinico</label>
                                <input type="email" className={`form-control ${!inputValue.email && error ? "input-data-missing" : ""}`} id="email" aria-describedby="emailHelp" name="email" value={inputValue.email} onChange={handleOnChange} />
                                <div id="emailHelp" className="form-text">Nunca compartiremos tu correo electrónico con nadie más.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input type="password" className={`form-control ${!inputValue.password && error ? "input-data-missing" : ""}`} id="password" name="password" value={inputValue.password} onChange={handleOnChange} />
                            </div>
                            {
                                error &&
                                <div className="alert alert-danger text-center" role="alert">
                                    {error}
                                </div>
                            }

                            <div className="text-center mb-5">
                                <button type="submit" className="btn btn-warning color-buttons">{loading ? "Cargando..." : "Iniciar Sesión"}</button>
                            </div>
                            <div className="col-md-4"></div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}