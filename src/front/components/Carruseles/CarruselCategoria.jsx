// src/front/components/Carruseles/CarruselCategoria.jsx
import React, { useEffect, useState } from "react";
import { getJoyasSearch } from "../../services/serviceApi";

export function CarruselCategoria({ category, highlighted }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getJoyasSearch();
        setItems(Array.isArray(data) ? data : (data?.items ?? []));
      } catch (e) {
        console.error("No se pudo cargar", e);
      }
    })();
  }, []);

  const cat = (category || "").toLowerCase();
  const passHighlight = (it) =>
    typeof it?.highlighted === "boolean" ? it.highlighted : !!it?.destacado;

  const filtered = items.filter((it) => {
    const sameCat = (it?.category || "").toLowerCase() === cat;
    if (!sameCat) return false;
    return typeof highlighted === "boolean" ? passHighlight(it) === highlighted : true;
  });

  if (filtered.length === 0) {
    return <p className="text-center text-muted my-4">No hay productos para esta categoría.</p>;
  }

  // Formateador de precios en EUR (se usa dentro del map)
  const euro = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });

  // Partimos en grupos de 4 para cada slide del carrusel
  const slides = [];
  for (let i = 0; i < filtered.length; i += 4) {
    slides.push(filtered.slice(i, i + 4));
  }

  const carouselId = `carrusel-${cat}-${highlighted ? "hi" : "all"}`;

  return (
    <div id={carouselId} className="carousel slide my-3" data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((group, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              {group.map((item) => (
                <div
                  key={item.id}
                  className="card h-100 d-flex flex-column"
                  style={{ width: "18rem", minHeight: 420 }}
                >
                  <div
                    style={{
                      height: 220,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 12,
                      background: "#fff"
                    }}
                  >
                    <img
                      src={item.url_image}
                      alt={item.name || "Producto"}
                      loading="lazy"
                      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                    />
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate">{item.name}</h5>
                    <p className="card-text mb-3">{euro.format(item.price)}</p>
                    <button className="btn btn-primary mt-auto">Agregar al carrito</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Anterior</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}