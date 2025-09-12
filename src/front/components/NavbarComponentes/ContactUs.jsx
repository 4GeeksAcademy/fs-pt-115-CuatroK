import { Link } from "react-router-dom"

export const ContactUs = () => {
    return (
        <div style={{ width: "100vw" }}>
            
            <ul className="nav justify-content-center page-background-color"
            style={{height: "90px"}}
                >
                <li className="nav-item pt-4">
                    <Link className="nav-link active fs-5" aria-current="page" to="/about"
                    style={{color: "#5C3D2E"}} 
                    >Sobre Nosotros
                    </Link>
                </li>
                <li className="nav-item pt-4">
                    <Link className="nav-link fs-5" 
                    style={{color: "#5C3D2E"}}
                    to="gallery"
                    >Galeria
                    </Link>
                </li>
                <li className="nav-item pt-4 ">
                    <Link className="nav-link fs-5" 
                    style={{color: "#5C3D2E"}}>Agendar Cita
                    </Link>
                </li>
                <li className="nav-item pt-4">
                    <Link className="nav-link fs-5" aria-disabled="true"
                    style={{color: "#5C3D2E"}}
                    >Contactanos
                    </Link>
                </li>
            </ul>
            
        </div>
    )
}