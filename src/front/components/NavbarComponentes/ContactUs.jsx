import { Link } from "react-router-dom"

export const ContactUs = () => {
    return (
        <div style={{ width: "100vw" }}>
            
            <ul className="nav justify-content-center page-background-color"
            style={{height: "90px"}}
                >
                <li className="nav-item pt-4">
                    <Link className="nav-link active fs-5" aria-current="page" to="/about"
                    style={{color: "#000000ff"}} 
                    >Sobre Nosotros
                    </Link>
                </li>
                <li className="nav-item pt-4">
                    <Link className="nav-link fs-5" 
                    style={{color: "#040100ff"}}
                    to="gallery"
                    >Galeria
                    </Link>
                </li>
                <li className="nav-item pt-4">
                    <Link className="nav-link fs-5" aria-disabled="true" to="contactanos"
                    style={{color: "#000000ff"}}
                    >Contactanos
                    </Link>
                </li>
            </ul>
            
        </div>
    )
}