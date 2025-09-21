import { useEffect, useState } from "react";
import { CategoryCard } from "./CategoryCard";
import { getJoyasSearch } from "../../services/serviceApi";
import { SearchBar } from "./SearchBar";

export const Catalog = () => {
  const [joyas, setJoyas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const cargarJoyas = async () => {
      const data = await getJoyasSearch();
      if (data) setJoyas(data);
    };
    cargarJoyas();
  }, []);

  const joyasFiltradas = busqueda.trim()
    ? joyas.filter(joya =>
        joya.name.toLowerCase().includes(busqueda.toLowerCase())
      )
    : joyas;

  return (
    <div className="container mt-4">
      <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />
      <div className="row mt-3">
        {joyasFiltradas.map((joya, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <CategoryCard
              image={joya.url_image}
              name={joya.name}
              price={joya.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};