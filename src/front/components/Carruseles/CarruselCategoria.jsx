// src/front/components/Carruseles/CarruselCategoria.jsx
import React, { useEffect, useState } from "react";
import { getJoyasSearch } from "../../services/serviceApi";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const FALLBACK_IMG = "https://via.placeholder.com/320x192?text=Sin+imagen";

// Si la URL de la imagen es absoluta, la usa tal cual.
// Si es relativa (con o sin "/"), la prefija con API_URL.
const resolveImageUrl = (src) => {
  if (!src) return FALLBACK_IMG;
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/")) return `${API_URL}${src}`;
  return `${API_URL}/${src}`;
};

export const CarruselCategoria = ({ category, highlighted }) => {
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const list = await getJoyasSearch(); // fetch centralizado en el service
        setItems(Array.isArray(list) ? list : (list?.items ?? []));
        setError(null);
      } catch (e) {
        setError(e.message || "Error al cargar productos");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6 text-center">Cargando…</div>;
  if (error)   return <div className="p-6 text-center text-red-600">{error}</div>;

  const cat = (category || "").toLowerCase();
  const isHighlighted = (it) =>
    typeof it?.highlighted === "boolean" ? it.highlighted : !!it?.destacado;

  return (
    <div className="carousel slide">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            {items
              .filter((it) => {
                const sameCat = (it?.category || "").toLowerCase() === cat;
                if (!sameCat) return false;
                return typeof highlighted === "boolean" ? isHighlighted(it) === highlighted : true;
              })
              .map((item) => (
                <div key={item.id} className="card" style={{ width: "18rem" }}>
                  <img
                    src={resolveImageUrl(item.url_image)}
                    alt={item.name || "Producto"}
                    className="card-img-top"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.price}</p>
                    <a href="#" className="btn btn-primary">Agregar al carrito</a>
                  </div>
                </div>
              ))}

            {items.filter((it) => {
              const sameCat = (it?.category || "").toLowerCase() === cat;
              if (!sameCat) return false;
              return typeof highlighted === "boolean" ? isHighlighted(it) === highlighted : true;
            }).length === 0 && (
              <div className="text-muted py-5">No hay productos para esta categoría.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarruselCategoria;
