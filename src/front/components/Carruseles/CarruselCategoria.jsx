// src/front/components/Carruseles/CarruselCategoria.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJoyasSearch } from "../../services/serviceApi";

export function CarruselCategoria({ category, highlighted }) {
  const [items, setItems] = useState([]);
  const [favoritos, setFavoritos] = useState(() => new Set());
  const navigate = useNavigate();

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

  const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

  const abrirProducto = (p) => {
    const idOSlug = p?.slug ? p.slug : String(p?.id ?? "");
    navigate(`/producto/${encodeURIComponent(idOSlug)}`);
  };

  const añadirFavoritos = (id) => {
    setFavoritos((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

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
              {group.map((item) => {
                const isFav = favoritos.has(item.id); // ← usar el estado correcto
                return (
                  <div
                    key={item.id}
                    className="card h-100 position-relative"
                    role="button"
                    tabIndex={0}
                    style={{ cursor: "pointer", width: "18rem" }}
                    onClick={() => abrirProducto(item)}
                    onKeyDown={(e) => e.key === "Enter" && abrirProducto(item)}
                  >
                    <img
                      src={item.url_image}
                      alt={item.name || "Producto"}
                      className="card-img-top"
                      style={{ objectFit: "cover", height: 200 }}
                      loading="lazy"
                    />

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{item.name || "Sin nombre"}</h5>
                      <p className="card-text small text-muted mb-2">
                        {item.description || "Sin descripción."}
                      </p>
                      <div className="mt-auto">
                        <div className="fw-bold">{euro.format(item.price)}</div>
                      </div>
                    </div>

                    {passHighlight(item) && (
                      <span className="badge text-bg-warning top-right">Destacado</span>
                    )}

                    <button
                      className="btn-like"
                      onClick={(e) => {
                        e.stopPropagation();
                        añadirFavoritos(item.id);
                      }}
                      aria-pressed={isFav}
                      aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                      title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                    >
                      <i
                        className={isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                        style={{ color: isFav ? "#e0182d" : "#9aa1ac", fontSize: 18 }}
                      />
                    </button>
                  </div>
                );
              })}
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
        <span className="visually-hidden"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden"></span>
      </button>
    </div>
  );
}