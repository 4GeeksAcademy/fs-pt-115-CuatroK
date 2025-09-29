import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJoyasSearch, addFavorite, removeFavorite } from "../../services/serviceApi";
import { useAuth } from "../../hooks/useAuth";
import "./CarruselEdges.css";

const CARDS_PER_VIEW = 5;
const STEP = 2;

function buildSlides(data, perView, step) {
  const out = [];
  const n = data.length;
  if (!n) return out;
  for (let start = 0; start < n; start += step) {
    const group = [];
    for (let k = 0; k < perView; k++) group.push(data[(start + k) % n]);
    out.push(group);
  }
  return out;
}

export function CarruselIzquierda({ category, highlighted, panelTitle = "Colección destacada" }) {
  const [items, setItems] = useState([]);
  const [favs, setFavs] = useState(() => new Set());
  const { token } = useAuth();
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

  const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

  const cat = (category || "").toLowerCase();
  const passHighlight = (it) =>
    typeof it?.highlighted === "boolean" ? it.highlighted : !!it?.destacado;

  const filtered = items.filter((it) => {
    const sameCat = (it?.category || "").toLowerCase() === cat;
    if (!sameCat) return false;
    return typeof highlighted === "boolean" ? passHighlight(it) === highlighted : true;
  });

  const slides = buildSlides(filtered, CARDS_PER_VIEW, STEP);
  if (slides.length === 0) {
    return <p className="text-center text-muted my-4">No hay productos para esta categoría.</p>;
  }

  const abrir = (p) => {
    const idOSlug = p?.slug ? p.slug : String(p?.id ?? "");
    navigate(`/producto/${encodeURIComponent(idOSlug)}`);
  };

  const toggleFav = async (id) => {
    if (!token) return;
    try {
      if (favs.has(id)) await removeFavorite(token, id);
      else await addFavorite(token, id);
      setFavs((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    } catch (e) {
      console.error("Error favorito:", e);
    }
  };

  const carouselId = `crs-left-${cat}-${highlighted ? "hi" : "all"}`;

  return (
    <div
      id={carouselId}
      className="carousel slide my-3 carousel-edge fade-left"
      data-bs-ride="carousel"
      data-bs-interval="3000"
      data-bs-pause="hover"
      data-bs-touch="true"
      data-bs-wrap="true"
    >
      {/* Panel fijo IZQUIERDA */}
      <div className="promo-panel promo-left">
        <div className="text-center px-3">
          <small className="text-muted d-block mb-1">Descubre lo nuevo</small>
          <h5 className="mb-0">{panelTitle}</h5>
        </div>
      </div>

      <div className="carousel-inner">
        {slides.map((group, i) => (
          <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
            <div className="cards-row">
              {group.map((item) => {
                const isFav = favs.has(item.id);
                return (
                  <div
                    key={item.id}
                    className="card h-100 position-relative"
                    role="button"
                    tabIndex={0}
                    onClick={() => abrir(item)}
                    onKeyDown={(e) => e.key === "Enter" && abrir(item)}
                  >
                    <img
                      src={item.url_image}
                      alt={item.name || "Producto"}
                      className="card-img-top"
                      loading="lazy"
                      onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/600x400?text=Sin+imagen")}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{item.name || "Sin nombre"}</h5>
                      <p className="card-text small text-muted mb-2">{item.description || "Sin descripción."}</p>
                      <div className="mt-auto fw-bold">{euro.format(item.price)}</div>
                    </div>

                    {token && (
                      <button
                        className="btn-like"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFav(item.id);
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
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Flechas en ambos lados */}
      <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}