import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div
      className="search-trigger"
      onMouseEnter={() => setShowSearch(true)}
      onMouseLeave={() => setShowSearch(false)}
    >
      <i className="fa-sharp fa-solid fa-magnifying-glass text-warning"></i>
      <input
        type="text"
        className={`form-control search-bar ${showSearch ? "visible" : ""}`}
        placeholder="Buscar joyas"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};