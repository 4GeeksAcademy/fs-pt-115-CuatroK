import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Profile = () => {
    const [logouted, setLogouted] = useState(!!localStorage.getItem("token"))


    const SignOut = () => {
        localStorage.removeItem("token")
        setLogouted(!!localStorage.getItem("token"))
        console.log(logouted)
    }

    useEffect(() => {
        setLogouted(!!localStorage.getItem("token"))
        console.log(logouted)
    }, [])

    return (

        <div >

            <div className="dropdown text-end">
                {
                    !logouted ?
                        <Link to="/login" className="text-white">Iniciar Sesión</Link>
                        :
                        <>
                            <button
                                className="btn btn-outline-dark dropdown"
                                type="button"
                                id="dropdownProfile"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ width: "50px", height: "50px" }}
                            >
                                <i className="fa-sharp fa-regular fa-circle-user text-warning"
                                ></i>
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownProfile">
                                <li><Link className="dropdown-item" to="/user"> Perfil</Link></li>
                                <li><a className="dropdown-item" href="#"> Configuración</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#" onClick={SignOut}> Cerrar sesión</a></li>
                            </ul>
                        </>
                }
            </div>
        </div>
    )
}