import { useState } from "react";
import "./ProductsStyles.css";
import { Link } from "react-router-dom";

export const Products = () => {
  const categories = [
    {
      displayName: "Relojes",
      apiName: "relojes",
      img: "https://i.pinimg.com/1200x/27/e8/21/27e8213686298acdd9789bce0f94db50.jpg",
    },
    {
      displayName: "Colgantes",
      apiName: "Colgante",
      img: "https://i.pinimg.com/736x/66/5a/17/665a17c38b8342fc3c075c9425e7b621.jpg",
    },
    {
      displayName: "Pulseras",
      apiName: "Pulsera",
      img: "https://i.pinimg.com/1200x/55/cc/37/55cc3763491e0303be2405065e4269ca.jpg",
    },
    {
      displayName: "Pendientes",
      apiName: "Pendiente",
      img: "https://i.pinimg.com/1200x/8a/2a/53/8a2a530437325cac25bcd326ceb58c2b.jpg",
    },
    {
      displayName: "Anillos",
      apiName: "Anillo",
      img: "https://i.pinimg.com/736x/04/29/88/042988b4462a5a957f748684e08eac38.jpg",
    },
  ];

  const [hovered, setHovered] = useState(null);

  return (
    <div className="row" style={{ width: "100vw", margin: 0, padding: 0 }}>
      <div className="d-flex justify-content-center align-items-center flex-nowrap overflow-auto gap-3 p-3 page-background-color">
        {categories.map((cat, index) => {
          const toUrl = `/catalogo/${encodeURIComponent(cat.apiName)}`;
          const isHovered = hovered === index;

          return (
            <Link
              key={cat.apiName}
              to={toUrl}
              className="text-decoration-none"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              aria-label={`Ver catálogo de ${cat.displayName}`}
            >
              <div className={`category-button ${isHovered ? "is-hovered" : ""}`}>
                {isHovered ? (
                  <img
                    src={cat.img}
                    alt={cat.displayName}
                    className="category-image"
                    loading="lazy"
                  />
                ) : (
                  <span className="category-label">{cat.displayName}</span>
                )}
              </div>
            </Link>
          );
        })}


        <Link to="/calculadora">
          <button
            className="btn btn-warning mb-3 color-buttons category-button mt-3"
            style={{ borderRadius: "12px" }}
          >
            Calculadora de Metales
          </button>
        </Link>
      </div>
    </div>
  );
};
