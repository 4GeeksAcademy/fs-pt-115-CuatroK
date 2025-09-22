import React, { useEffect, useState } from "react";
import { getJoyasSearch } from "../../services/serviceApi";

const CARDS_PER_SLIDE = 4;

export function CarruselCategoria({ category, highlighted }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getJoyasSearch();             
        setItems(Array.isArray(data) ? data : (data?.items ?? []));
        setError(null);
      } catch {
        setError("No se pudo cargar");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="text-center p-4">Cargando…</p>;
  if (error)   return <p className="text-center text-danger p-4">{error}</p>;

  const cat = (category || "").toLowerCase();
  const passHighlight = (it) =>
    typeof it.highlighted === "boolean" ? it.highlighted : !!it.destacado;


  const filtered = items.filter((it) => {
    const sameCat = (it?.category || "").toLowerCase() === cat;
    if (!sameCat) return false;
    return typeof highlighted === "boolean" ? passHighlight(it) === highlighted : true;
  });

  const slides = [];
  for (let i = 0; i < filtered.length; i += CARDS_PER_SLIDE) {
    slides.push(filtered.slice(i, i + CARDS_PER_SLIDE));
  }

  const carouselId = `carrusel-${cat}-${highlighted ? "hi" : "all"}`;

  return (
    <div id={carouselId} className="carousel slide my-3" data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((group, idx) => (
          <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              {group.map((item) => (
                <div key={item.id} className="card" style={{ width: "18rem" }}>
                  <img
                    className="card-img-top"
                    src={item.url_image || FALLBACK_IMG}
                    alt={item.name || "Producto"}
                    onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                    loading="lazy"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.price}</p>
                    <button className="btn btn-primary">Agregar al carrito</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button"
        data-bs-target={`#${carouselId}`} data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button"
        data-bs-target={`#${carouselId}`} data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}


