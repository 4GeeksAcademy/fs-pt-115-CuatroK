import { Link } from "react-router-dom"
import "./contactUsStyles.css"

export const ContactUs = () => {
    
    return (
        <div className="scroll-container " id="scrollContainer">
            <div className="scroll-track" id="scrollTrack">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link scroll-item" to="/about">Sobre Nosotros</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link scroll-item">Galería</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link scroll-item">Agendar Cita</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link scroll-item">Contáctanos</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}