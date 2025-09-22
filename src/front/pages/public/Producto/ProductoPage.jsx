import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJoyasSearch } from "../../../services/jewellsService";
import "./ProductoPage_style.css";

const SPEC_LABELS = {
  brand: "Marca",
  metal: "Metal",
  gem: "Gema",
  gender: "Género",
  water_resistance: "Resistencia al agua",
  watch: "Tipo de reloj",
  watch_bracelet_material: "Material correa",
  caja: "Caja",
  coating: "Acabado",
  clasp: "Cierre",
  ring_type: "Tipo de anillo",
  earring_type: "Tipo de pendiente",
  bracelet: "Tipo de pulsera",
};

export const ProductoPage = () => {
  const { idOrSlug } = useParams();
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ok | error
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      setStatus("loading");
      try {
        const all = await getJoyasSearch();
        const found = (all || []).find(
          (p) =>
            String(p.id) === String(idOrSlug) ||
            String(p.slug || "").toLowerCase() === String(idOrSlug).toLowerCase()
        );
        if (!alive) return;
        setItem(found || null);
        setStatus(found ? "ok" : "error");
        setImgIndex(0);
      } catch {
        if (!alive) return;
        setStatus("error");
      }
    })();
    return () => {
      alive = false;
    };
  }, [idOrSlug]);

  if (status === "loading") return <div className="container py-4">Cargando…</div>;
  if (status === "error" || !item)
    return (
      <div className="container py-4">
        <div className="alert alert-danger">Producto no encontrado.</div>
      </div>
    );

  
  const images = Array.isArray(item.images) && item.images.length > 0 ? item.images : [item.url_image];

  
  const specs = Object.entries(SPEC_LABELS)
    .map(([key, label]) => [label, item?.[key]])
    .filter(([, value]) => value !== null && value !== undefined && String(value).trim() !== "");

  const inStock = (item.quantity ?? 0) > 0;

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* ---------- Galería ---------- */}
        <div className="col-12 col-lg-7">
          <div className="row g-3"> 
            <div className="col-12 col-md-2 order-2 order-md-1">
              <div className="gallery-thumbs d-flex d-md-block gap-2 overflow-auto">
                {images.map((src, i) => (
                  <button
                    key={i}
                    className={`thumb-btn btn p-0 border ${i === imgIndex ? "thumb-active" : ""}`}
                    onClick={() => setImgIndex(i)}
                    aria-label={`Imagen ${i + 1}`}
                    title={`Imagen ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt={`${item.name} ${i + 1}`}
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/300?text=Sin+imagen";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="col-12 col-md-10 order-1 order-md-2">
              <div className="ratio ratio-1x1 bg-white border rounded d-flex align-items-center justify-content-center">
                <img
                  src={images[imgIndex]}
                  alt={item.name}
                  className="img-contain p-3"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/800?text=Sin+imagen";
                  }}
                />
                
                <div className="position-absolute top-0 start-0 m-2 d-flex flex-column gap-2">
                  {item.highlighted && <span className="badge bg-dark">Nuevo</span>}
                  {item.discount && <span className="badge bg-danger">-{item.discount}%</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="col-12 col-lg-5">
          <div className="card shadow-sm sticky-lg-top sticky-buy-box">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="badge text-bg-light">{item.category ?? "Sin categoría"}</span>
                {inStock ? (
                  <span className="badge text-bg-success">Stock: {item.quantity}</span>
                ) : (
                  <span className="badge text-bg-danger">Sin stock</span>
                )}
              </div>

              <h1 className="h4 fw-bold mb-1">{item.name}</h1>

              <div className="d-flex align-items-baseline gap-2 mb-3">
                <span className="fs-3 fw-bold text-danger">{Number(item.price)?.toFixed(2)} €</span>
                {item.price_original && (
                  <span className="text-muted text-decoration-line-through">
                    {Number(item.price_original).toFixed(2)} €
                  </span>
                )}
                {item.discount && <span className="badge bg-danger ms-2">-{item.discount}%</span>}
              </div>

              <p className="text-muted mb-3">{item.description}</p>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-dark btn-lg"
                  disabled={!inStock}
                  onClick={() => {
                }}
                >
                  Añadir al carrito
                </button>
              </div>

              
              {specs.length > 0 && (
                <>
                  <hr className="my-4" />
                  <h2 className="h6 mb-3">Ficha técnica</h2>
                  <dl className="row specs-list">
                    {specs.map(([label, value]) => (
                      <div key={label} className="col-12 d-flex py-1 border-bottom border-200">
                        <dt className="spec-label text-muted me-2">{label}</dt>
                        <dd className="mb-0 spec-value">{String(value)}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
