import { useState } from "react"
import { loginUser } from "../../../services/serviceApi"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [inputValue, setInputValue] = useState({
        email: "",
        password: ""
    })
    const [alertError, setAlertError] = useState(false)
    const [alertMsg, setAlertMsg] = useState()
    const navigate = useNavigate()

    const handleToken = (token) => {
        localStorage.setItem("token", token)
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setInputValue({
            ...inputValue,
            [name]: value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        loginUser(inputValue, navigate, handleToken, setAlertError, setAlertMsg)
        console.log(inputValue)
    }

    return (
        <div>
            <div className="container products-card">

                <div className="row">
                    <div className="col-md-12 text-center mt-5">
                        <h1>Iniciar Sesión</h1>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <form onSubmit={handleOnSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo Electrinico</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={inputValue.email} onChange={handleOnChange} />
                                <div id="emailHelp" className="form-text">Nunca compartiremos tu correo electrónico con nadie más.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="password" name="password" value={inputValue.password} onChange={handleOnChange} />
                            </div>
                            {
                                alertError &&
                                <div className="alert alert-danger text-center" role="alert">
                                    {alertMsg}
                                </div>
                            }

                            <div className="text-center mb-5">
                                <button type="submit" className="btn btn-warning color-buttons">Iniciar Sesión</button>
                            </div>
                            <div className="col-md-4"></div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}