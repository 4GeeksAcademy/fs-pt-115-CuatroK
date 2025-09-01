import { useState } from "react"

export const Login = () => {
    const [inputValue, setInputValue] = useState({
        "email": "",
        "password": ""
    })



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
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo Electrinico</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">Nunca compartiremos tu correo electrónico con nadie más.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="password" />
                            </div>
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