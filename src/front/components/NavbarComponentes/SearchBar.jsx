import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../navbarStyles.css";

export const SearchBar = () => {
  const [busqueda, setBusqueda] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && busqueda.trim() !== "") {
      navigate(`/resultados/${encodeURIComponent(busqueda.trim())}`);
      setShowSearch(false); // Oculta el input después de buscar
      setBusqueda(""); // Limpia el campo
    }
  };

  return (
    <div
      className="search-wrapper d-flex align-items-center mt-2"
      onMouseEnter={() => setShowSearch(true)}
      onMouseLeave={() => busqueda === "" && setShowSearch(false)}
    >
      <div className="search-icon-only">
        <i className="fa-sharp fa-solid fa-magnifying-glass text-light"></i>
      </div>
    
      <input
        type="text"
        className={`form-control search-input ms-2 ${showSearch ? "visible" : "hidden"}`}
        placeholder="Buscar joyas"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus={showSearch}
      />
    </div>
  );
};
