import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../navbarStyles.css";

export const SearchBar = () => {
  const [busqueda, setBusqueda] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && busqueda.trim() !== "") {
      navigate(`/resultados/${busqueda}`);
    }
  };

  return (
    <div>
      <div className="input-group mt-2">
        <span className="input-group-text bg-white border-end-0">
          <i className="fa-sharp fa-solid fa-magnifying-glass text-warning"></i>
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Buscar joyas"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};