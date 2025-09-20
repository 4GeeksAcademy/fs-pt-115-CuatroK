import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJoyasSearch } from "../../services/serviceApi";
import { CategoryCard } from "./CategoryCard";

export const SearchResults = () => {
  const { busqueda } = useParams();
  const [joyas, setJoyas] = useState([]);

  useEffect(() => {
    const cargarJoyas = async () => {
      const data = await getJoyasSearch();
      if (data) {
        const filtradas = data.filter(joya =>
          joya.name.toLowerCase().includes(busqueda.toLowerCase())
        );
        setJoyas(filtradas);
      }
    };
    cargarJoyas();
  }, [busqueda]);

  return (
    <div className="container mt-4">
      <h4>Resultados para: "{busqueda}"</h4>
      <div className="row mt-3">
        {joyas.length > 0 ? (
          joyas.map((joya, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <CategoryCard
                image={joya.url_image}
                name={joya.name}
                price={joya.price}
              />
            </div>
          ))
        ) : (
          <p className="text-muted text-center">
            No se encontraron joyas con ese nombre.
          </p>
        )}
      </div>
    </div>
  );
};