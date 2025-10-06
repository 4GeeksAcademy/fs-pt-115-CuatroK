import { Link } from "react-router-dom";

export const Publicidad5 = () => {
  return (
    <div className="container-fluid p-0">
      <Link to="/calculadora" className="d-block" aria-label="Ir a calculadora de metales">
        <img
          src="/public/PublicidadDefinitiva.png"
          alt="Calcula el valor diario del oro y la plata"
          className="img-fluid w-100 d-block"
          style={{ height: "100%", objectFit: "cover", borderTop: "5px solid #553b00ff", borderBottom: "5px solid #553b00ff" }}
        />
      </Link>
    </div>
  );
}; 