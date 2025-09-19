import { useEffect, useState } from "react";
import { CategoryCard } from "./CategoryCard";
import { SearchBar } from "./SearchBar";
import { getJoyasSearch } from "./serviceApi";

export const Catalog = () => {
  const [joyas, setJoyas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [activarBusqueda, setActivarBusqueda] = useState(false);

  useEffect(() => {
    const cargarJoyas = async () => {
      const data = await getJoyasSearch();
      if (data) setJoyas(data);
    };
    cargarJoyas();
  }, []);

  const joyasFiltradas = activarBusqueda
  ? joyas.filter(joya =>
      joya.name.toLowerCase().includes(busqueda.toLowerCase())
    )
  : [];

  return (
    <div className="container mt-4">
      <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} setActivarBusqueda={setActivarBusqueda}/>

      <div className="row mt-3">
        {joyasFiltradas.length > 0 ? (
          joyasFiltradas.map((joya, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <CategoryCard
                image={joya.url_image}
                name={joya.name}
                price={joya.price}
              />
            </div>
          ))
        ) : (
          <p className="text-muted text-center">No se encontraron joyas con ese nombre.</p>
        )}
      </div>
    </div>
  );
};