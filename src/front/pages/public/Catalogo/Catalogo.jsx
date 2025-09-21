
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "https://vigilant-lamp-r4w7576jwqv935rj4-3001.app.github.dev/";

export const Catalogo = () => {
  const { category } = useParams(); 
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle"); 
  const [error, setError] = useState(null);

  
  const title = useMemo(() => {
    try {
      return decodeURIComponent(category);
    } catch {
      return category;
    }
  }, [category]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchItems = async () => {
      setStatus("loading");
      setError(null);

      try {
        
        const url = `${API_BASE}/api/jewells?category=${encodeURIComponent(
          title
        )}`;

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();

        
        const list = Array.isArray(data) ? data : data?.results ?? [];
        setItems(list);
        setStatus("success");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Error desconocido");
          setStatus("error");
        }
      }
    };

    fetchItems();
    return () => controller.abort();
  }, [title]);

  return (
    <div className="container py-4">
      <h1 className="mb-3">Catálogo: {title}</h1>

      {status === "loading" && <p>Cargando {title}…</p>}
      {status === "error" && (
        <div className="alert alert-danger">
          No se pudieron cargar los {title}. {error}
        </div>
      )}
      {status === "success" && items.length === 0 && (
        <div className="alert alert-warning">
          No hay productos en la categoría “{title}”.
        </div>
      )}

      {status === "success" && items.length > 0 && (
        <div className="row g-3">
          {items.map((it) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={it.id}>
              <div className="card h-100">
                <img
                  src={it.url_image}
                  alt={it.name}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: 200 }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/600x400?text=Sin+imagen";
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{it.name}</h5>
                  <p className="card-text small text-muted mb-2">
                    {it.description}
                  </p>
                  <div className="mt-auto">
                    <div className="fw-bold">
                      {Number(it.price)?.toFixed(2)} €
                    </div>
                    {/* Botón de añadir al carrito o ver detalle si lo necesitas */}
                    <button className="btn btn-primary w-100 mt-2">
                      Añadir
                    </button>
                  </div>
                </div>
                {it.highlighted && (
                  <span
                    className="badge text-bg-warning"
                    style={{ position: "absolute", top: 8, right: 8 }}
                  >
                    Destacado
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
