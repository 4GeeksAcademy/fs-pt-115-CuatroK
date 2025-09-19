import { useState } from "react";

export const SearchBar = ({ busqueda, setBusqueda, setActivarBusqueda }) => {
  const [showSearch, setShowSearch] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setActivarBusqueda(true);
    }
  };

  return (
    <div>
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
          onChange={(e) => {
            setBusqueda(e.target.value);
            setActivarBusqueda(false); // desactiva búsqueda hasta que se presione Enter
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};