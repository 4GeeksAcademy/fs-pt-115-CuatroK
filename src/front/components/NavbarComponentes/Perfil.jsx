export const Perfil = () => {
    return (

        <div>

            <div className="dropdown text-end">
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
                    <li><a className="dropdown-item" href="#"> Perfil</a></li>
                    <li><a className="dropdown-item" href="#"> Configuración</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#"> Cerrar sesión</a></li>
                </ul>
            </div>
        </div>
    )
}