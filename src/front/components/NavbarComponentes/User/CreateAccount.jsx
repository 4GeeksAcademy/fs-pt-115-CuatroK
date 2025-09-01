import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { registerUser } from "../../../services/serviceApi"

export const CreateAccount = () => {

    const [inputValue, setInputValue] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [alertError, setAlertError] = useState(false)
    const [alertMsg, setAlertMsg] = useState()
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
        console.log(inputValue)
        registerUser(inputValue, navigate, setAlertError, setAlertMsg)
    };

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
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={inputValue.username}
                                onChange={handleOnChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={inputValue.email}
                                onChange={handleOnChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={inputValue.password}
                                onChange={handleOnChange}
                            />
                        </div>

                        {alertError &&
                            <div className="alert alert-danger text-center" role="alert">
                                {alertMsg}
                            </div>
                        }

                        <button type="submit" className="btn btn-primary">Registrarse</button>
                    </form>
                </div>
            </div>
        </div>
    );
}