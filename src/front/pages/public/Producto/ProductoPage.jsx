import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getJoyasSearch } from "../../../services/jewellsService";
import "./ProductoPage_style.css";
import { useCart } from "../../../hooks/useFetch";
import { useAuth } from "../../../hooks/useAuth";
import FavoriteButton from "../../../components/public/FavoriteButton.jsx";

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

const textoStock = (producto) => {
  const qty = Number(producto?.quantity ?? 0);
  if (qty <= 0) return { label: "Sin stock", cls: "text-bg-danger", out: true };
  if (qty < 10) return { label: "Últimas unidades", cls: "text-bg-warning", out: false };
  return { label: "Stock", cls: "text-bg-success", out: false };
};

export const ProductoPage = () => {
  const { idOrSlug } = useParams();

  const [currentItem, setCurrentItem] = useState(null);
  const [loadStatus, setLoadStatus] = useState("loading");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mensajeCarrito, setMensajeCarrito] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { token } = useAuth();
  const usuarioAutenticado = token;

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    let componentAlive = true;

    (async () => {
      setLoadStatus("loading");
      try {
        const allProducts = await getJoyasSearch();

        const currentProduct = (allProducts || []).find(
          (product) =>
            String(product.id) === String(idOrSlug) ||
            String(product.slug || "").toLowerCase() === String(idOrSlug).toLowerCase()
        );

        if (!componentAlive) return;

        setCurrentItem(currentProduct || null);
        setLoadStatus(currentProduct ? "ok" : "error");
        setActiveImageIndex(0);

        if (currentProduct) {
          const matchFields = ["category", "brand", "metal", "gender", "gem"];

          const scoredProducts = (allProducts || [])
            .filter((product) => String(product.id) !== String(currentProduct.id))
            .map((product) => {
              let similarityScore = 0;

              matchFields.forEach((fieldKey) => {
                const currentValue = (currentProduct[fieldKey] || "").toString().toLowerCase().trim();
                const candidateValue = (product[fieldKey] || "").toString().toLowerCase().trim();
                if (currentValue && candidateValue && currentValue === candidateValue) {
                  similarityScore += 1;
                }
              });

              if (
                currentProduct.category &&
                product.category &&
                String(currentProduct.category).toLowerCase() === String(product.category).toLowerCase()
              ) {
                similarityScore += 0.5;
              }

              return { ...product, similarityScore };
            })
            .sort((a, b) => b.similarityScore - a.similarityScore);

          let topRelated = scoredProducts.slice(0, 4);

          if (topRelated.length < 4) {
            const sameCategoryFill = (allProducts || []).filter(
              (product) =>
                product.id !== currentProduct.id &&
                product.category &&
                currentProduct.category &&
                String(product.category).toLowerCase() === String(currentProduct.category).toLowerCase() &&
                !topRelated.find((picked) => picked.id === product.id)
            );
            topRelated = [...topRelated, ...sameCategoryFill.slice(0, 4 - topRelated.length)];
          }

          setRelatedProducts(topRelated);
        } else {
          setRelatedProducts([]);
        }
      } catch {
        if (!componentAlive) return;
        setLoadStatus("error");
        setRelatedProducts([]);
      }
    })();

    return () => {
      componentAlive = false;
    };
  }, [idOrSlug]);

  if (loadStatus === "loading") return <div className="container py-4">Cargando…</div>;

  if (loadStatus === "error" || !currentItem) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">Producto no encontrado.</div>
      </div>
    );
  }

  const estado = textoStock(currentItem);
  const hasInventory = !estado.out;

  const imageGallery =
    Array.isArray(currentItem.images) && currentItem.images.length > 0
      ? currentItem.images
      : [currentItem.url_image];

  const SPEC_LABELS_ENTRIES = Object.entries(SPEC_LABELS);
  const specList = SPEC_LABELS_ENTRIES
    .map(([dataKey, label]) => [label, currentItem?.[dataKey]])
    .filter(([, value]) => value !== null && value !== undefined && String(value).trim() !== "");

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <div className="row g-3">
            <div className="col-12 col-md-2 order-2 order-md-1">
              <div className="gallery-thumbs d-flex d-md-block gap-2 overflow-auto">
                {imageGallery.map((imageSrc, imageIndex) => (
                  <button
                    key={imageIndex}
                    className={`thumb-btn btn p-0 border ${imageIndex === activeImageIndex ? "thumb-active" : ""}`}
                    onClick={() => setActiveImageIndex(imageIndex)}
                  >
                    <img
                      src={imageSrc}
                      alt={`${currentItem.name} ${imageIndex + 1}`}
                      onError={(event) => {
                        event.currentTarget.src = "https://via.placeholder.com/300?text=Sin+imagen";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="col-12 col-md-10 order-1 order-md-2">
              
              <div className="ratio ratio-1x1 product-viewer bg-white border rounded">
                <img
                  src={imageGallery[activeImageIndex]}
                  alt={currentItem.name}
                  className="img-contain p-3"
                  onError={(event) => {
                    event.currentTarget.src = "https://via.placeholder.com/800?text=Sin+imagen";
                  }}
                />

                <div className="position-absolute top-0 start-0 m-2 d-flex align-items-start flex-column gap-2">
                  {currentItem.highlighted && <span className="badge bg-dark">Nuevo</span>}
                  {currentItem.discount && <span className="badge bg-danger">-{currentItem.discount}%</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card shadow-sm sticky-lg-top sticky-buy-box position-relative" style={{ zIndex: 1 }}>
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <span className={`badge ${estado.cls} ms-auto`}>{estado.label}</span>
              </div>

              <h1 className="h4 fw-bold mb-1">{currentItem.name}</h1>

              <div className="d-flex align-items-baseline gap-2 mb-3">
                <span className="fs-3 fw-bold text-danger">{Number(currentItem.price)?.toFixed(2)} €</span>
                {currentItem.price_original && (
                  <span className="text-muted text-decoration-line-through">
                    {Number(currentItem.price_original).toFixed(2)} €
                  </span>
                )}
                {currentItem.discount && <span className="badge bg-danger ms-2">-{currentItem.discount}%</span>}
              </div>

              <p className="text-muted mb-3">{currentItem.description}</p>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-dark btn-lg"
                  disabled={!hasInventory}
                  onClick={(ev) => {
                    ev.stopPropagation();

                    if (!usuarioAutenticado) {
                      setMensajeCarrito("Debes iniciar sesión para añadir productos 🛑");
                      setMostrarMensaje(true);
                      setTimeout(() => navigate("/login"), 1500);
                    } else {
                      addToCart(currentItem.id);
                      setMensajeCarrito("Producto añadido al carrito ✅");
                      setMostrarMensaje(true);
                    }

                    setTimeout(() => setMostrarMensaje(false), 3000);
                  }}
                >
                  Añadir al carrito
                </button>

                {mostrarMensaje && <div className="alert alert-warning text-center mt-3">{mensajeCarrito}</div>}
              </div>

              {specList.length > 0 && (
                <>
                  <hr className="my-4" />
                  <h2 className="h6 mb-3">Ficha técnica</h2>
                  <dl className="row specs-list">
                    {specList.map(([labelText, valueText]) => (
                      <div key={labelText} className="col-12 d-flex py-1 border-bottom border-200">
                        <dt className="spec-label text-muted me-2">{labelText}</dt>
                        <dd className="mb-0 spec-value">{String(valueText)}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}
            </div>

            <div className="position-absolute bottom-0 end-0 m-2">
              <FavoriteButton itemId={currentItem.id} size={20} />
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <>
          <hr className="my-5" />
          <h3 className="h5 mb-3">También te puede gustar</h3>
          <div className="row g-3">
            {relatedProducts.map((relatedItem) => {
              const relatedImage =
                Array.isArray(relatedItem.images) && relatedItem.images[0]
                  ? relatedItem.images[0]
                  : relatedItem.url_image;

              const relEstado = textoStock(relatedItem);

              return (
                <div key={relatedItem.id} className="col-6 col-md-4 col-lg-3">
                  <Link
                    to={`/producto/${relatedItem.slug || relatedItem.id}`}
                    className="card card-related h-100 text-decoration-none"
                  >
                    <div className="ratio ratio-1x1 product-viewer bg-white">
                      <img
                        className="img-contain p-2"
                        src={relatedImage}
                        alt={relatedItem.name}
                        onError={(event) => {
                          event.currentTarget.src = "https://via.placeholder.com/600x600?text=Sin+imagen";
                        }}
                      />
                      {relatedItem.discount && (
                        <span className="badge bg-danger position-absolute m-2">-{relatedItem.discount}%</span>
                      )}
                    </div>

                    <div className="card-body">
                      <div className="d-flex align-items-start mb-1">
                        <span className={`badge ${relEstado.cls} ms-auto`}>{relEstado.label}</span>
                      </div>

                      <h4 className="card-title fs-6 text-truncate" title={relatedItem.name}>
                        {relatedItem.name}
                      </h4>

                      <div className="fw-bold">
                        {Number(relatedItem.price)?.toFixed(2)} €
                        {relatedItem.price_original && (
                          <span className="text-muted text-decoration-line-through ms-2">
                            {Number(relatedItem.price_original).toFixed(2)} €
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
