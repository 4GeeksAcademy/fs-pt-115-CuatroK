import { Link } from "react-router-dom"

export const Profile = () => {
    return (

        <div>

            <div className="dropdown text-end">
                <Link to="/login">Iniciar Sesión</Link>
                {/*<button
                    className="btn btn-outline-dark dropdown"
                    type="button"
                    id="dropdownProfile"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ width: "50px", height: "50px" }}
                >
                    <i className="fa-sharp fa-regular fa-circle-user text-warning"
                    ></i>
                </button>*/}

                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownProfile">
                    <li><Link className="dropdown-item" to="/user"> Perfil</Link></li>
                    <li><a className="dropdown-item" href="#"> Configuración</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#"> Cerrar sesión</a></li>
                </ul>
            </div>
        </div>
    )
}