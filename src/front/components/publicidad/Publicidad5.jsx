import { Link } from "react-router-dom";

export const Publicidad5 = () => {
  return (
    <div className="container-fluid p-0">
      <Link to="/calculadora" className="d-block" aria-label="Ir a calculadora de metales">
        <img
          src="/banner_calculadora_metales.jpg"  
          alt="Calcula el valor diario del oro y la plata"
          className="img-fluid w-100 d-block"
          style={{ height: "230px", objectFit: "cover" }}
        />
      </Link>
    </div>
  );
};