import { useEffect, useState } from "react";
import { CategoryCard } from "./CategoryCard";
import { getJoyasSearch } from "../../services/serviceApi";
import { SearchBar } from "./SearchBar";

export const Catalog = () => {
  const [joyas, setJoyas] = useState([]);

  useEffect(() => {
    const cargarJoyas = async () => {
      const data = await getJoyasSearch();
      console.log(data);
      if (data) setJoyas(data);
    };
    cargarJoyas();
  }, []);

  return (
    <div className="container mt-4">
      <SearchBar />
      <div className="row mt-3">
        {joyas.map((joya, index) => (
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