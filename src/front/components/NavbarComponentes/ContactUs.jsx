import { Link } from "react-router-dom"

export const ContactUs = () => {
    return (
        <div style={{ width: "100vw" }}>
                  
                <ul className="nav justify-content-center" style={{ backgroundColor: ' #5C3D2E' }}>
                    <li className="nav-item">
                        <Link className="nav-link active text-warning" aria-current="page" to="/about">Sobre Nosotros</Link>
                    </li> 
                    <li className="nav-item">
                        <Link className="nav-link text-warning" >Galeria</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-warning" >Agendar Cita</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-warning" aria-disabled="true">Contactanos</Link>
                    </li>
                    
                </ul>
            
        </div>
    )
}