import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import "../Catalogo/Style_Catalogo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Dropdown } from "bootstrap";

import { getJoyasSearch } from "../../../services/jewellsService";
import LoadingSpinner from "../../../components/public/LoadingSpinner";
import { useAuth } from "../../../hooks/useAuth";
import { useCart } from "../../../hooks/useFetch";
import FavoriteButton from "../../../components/public/FavoriteButton.jsx";

function normalizeText(originalText) {
  return String(originalText || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const LABELS = {
  brand: "Marca",
  metal: "Metal",
  coating: "Recubrimiento",
  gender: "Género",
  gem: "Gema",
  ring_type: "Tipo de anillo",
  earring_type: "Tipo de pendiente",
  bracelet: "Tipo de pulsera",
  watch: "Tipo de reloj",
  watch_bracelet_material: "Material correa",
  water_resistance: "Resistencia al agua",
  caja: "Caja",
  clasp: "Cierre",
};

const CANDIDATE_FIELDS = [
  "brand",
  "metal",
  "coating",
  "gender",
  "gem",
  "ring_type",
  "earring_type",
  "bracelet",
  "watch",
  "watch_bracelet_material",
  "water_resistance",
  "caja",
  "clasp",
];

export function SearchResults() {
  const { busqueda } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const usuarioAutenticado = !!token;

  const decodedQuery = decodeURIComponent(busqueda || "");
  const normalizedTerm = normalizeText(decodedQuery);

  const [cargando, setCargando] = useState(false);
  const [errorTexto, setErrorTexto] = useState("");

  const [allItems, setAllItems] = useState([]);
  const [termItems, setTermItems] = useState([]);

  const [options, setOptions] = useState({ campos: {}, precioMin: 0, precioMax: 0 });
  const [filters, setFilters] = useState({});
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const [finalItems, setFinalItems] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const [mensajePorProducto, setMensajePorProducto] = useState({});

  
  const FALLBACK_SVG =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
  <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
    <stop offset="0" stop-color="#f9f5f0"/><stop offset="1" stop-color="#f5f0e6"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <g fill="#c2a15d" opacity="0.6" transform="translate(400,300)">
    <circle r="120" fill="none" stroke="#d4b97a" stroke-width="6"/>
    <path d="M-45 -20 h90 v40 h-90z" fill="#d4b97a"/>
  </g>
  <text x="50%" y="85%" dominant-baseline="middle" text-anchor="middle"
        font-family="system-ui, -apple-system, Segoe UI, Roboto" font-size="28" fill="#7a1f3d">Sin imagen</text>
</svg>`);
  const handleImgError = (ev) => {
    const img = ev.currentTarget;
    if (img.dataset.fbk === "1") return;
    img.dataset.fbk = "1";
    img.src = FALLBACK_SVG;
  };
  

  
  useEffect(() => {
    const triggers = document.querySelectorAll('[data-bs-toggle="dropdown"]');
    const instances = Array.from(triggers).map((el) => new Dropdown(el));
    return () => instances.forEach((i) => i.dispose());
  }, []);

  const openProduct = (productItem) => {
    const idOrSlug = productItem?.slug ? productItem.slug : String(productItem?.id ?? "");
    navigate(`/producto/${encodeURIComponent(idOrSlug)}`);
  };

  const labelSort = (key) =>
    key === "name_asc"
      ? "Nombre, A a Z"
      : key === "name_desc"
      ? "Nombre, Z a A"
      : key === "price_asc"
      ? "Precio: de más bajo a más alto"
      : key === "price_desc"
      ? "Precio: de más alto a más bajo"
      : "Relevancia";

  const sortItems = (arr, key) => {
    const list = arr.slice();
    if (key === "name_asc" || key === "name_desc") {
      list.sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
      if (key === "name_desc") list.reverse();
    } else if (key === "price_asc" || key === "price_desc") {
      list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
      if (key === "price_desc") list.reverse();
    }
    return list;
  };

  const { addToCart } = useCart();

  
  const esNuevo = (producto) => {
    const raw = producto?.published_at || producto?.created_at || producto?.createdAt;
    if (!raw) return false;
    const fecha = new Date(raw);
    if (isNaN(fecha.getTime())) return false;
    const diffMin = (Date.now() - fecha.getTime()) / 1000 / 60;
    return diffMin < 60; // < 60 min
  };
  const textoStock = (producto) => {
    const qty = Number(producto?.quantity ?? 0);
    if (qty <= 0) return { label: "Sin stock", cls: "text-bg-danger", out: true };
    if (qty < 10) return { label: "Últimas unidades", cls: "text-bg-warning", out: false };
    return { label: "Stock", cls: "text-bg-success", out: false };
  };

  
  useEffect(() => {
    let vivo = true;
    (async () => {
      setCargando(true);
      setErrorTexto("");
      setAllItems([]);
      setTermItems([]);
      setOptions({ campos: {}, precioMin: 0, precioMax: 0 });
      setFilters({});
      setPriceRange({ min: "", max: "" });
      try {
        const apiResponse = await getJoyasSearch();
        if (!vivo) return;
        const normalizedList = Array.isArray(apiResponse) ? apiResponse : apiResponse?.items ?? [];
        setAllItems(normalizedList);
      } catch (e) {
        if (!vivo) return;
        setErrorTexto(e?.message || "No se pudieron cargar los resultados.");
      } finally {
        if (vivo) setCargando(false);
      }
    })();
    return () => {
      vivo = false;
    };
  }, [busqueda]);

  
  useEffect(() => {
    if (!normalizedTerm) {
      setTermItems([]);
      return;
    }
    const matchesTerm = (j) => {
      const fields = [j?.name, j?.brand, j?.category, j?.gem, j?.metal, j?.description];
      for (const v of fields) if (normalizeText(v).includes(normalizedTerm)) return true;
      return false;
    };
    setTermItems((allItems || []).filter(matchesTerm));
  }, [allItems, normalizedTerm]);

  
  useEffect(() => {
    const uniqSorted = (arr) =>
      [...new Set(arr.filter((v) => v != null && String(v).trim() !== ""))].sort((a, b) =>
        String(a).localeCompare(String(b))
      );
    const campos = {};
    CANDIDATE_FIELDS.forEach((key) => {
      const values = uniqSorted(termItems.map((p) => p?.[key]));
      if (values.length > 0) campos[key] = { label: LABELS[key] || key, values };
    });
    const prices = termItems.map((p) => Number(p.price) || 0);
    const precioMin = prices.length ? Math.min(...prices) : 0;
    const precioMax = prices.length ? Math.max(...prices) : 0;
    setOptions({ campos, precioMin, precioMax });
  }, [termItems]);

  
  useEffect(() => {
    setFilters((prev) => {
      const normalized = {};
      Object.keys(options.campos).forEach((k) => {
        const oldSel = prev[k] || [];
        const allowed = new Set(options.campos[k].values);
        normalized[k] = oldSel.filter((v) => allowed.has(v));
      });
      return normalized;
    });
  }, [options.campos]);

  
  useEffect(() => {
    const filtered = (termItems || []).filter((product) => {
      for (const [fieldKey, selectedList] of Object.entries(filters)) {
        if (selectedList?.length) {
          const value = String(product?.[fieldKey] ?? "").trim();
          if (!selectedList.includes(value)) return false;
        }
      }
      const price = Number(product.price) || 0;
      const min = priceRange.min !== "" ? Number(priceRange.min) : -Infinity;
      const max = priceRange.max !== "" ? Number(priceRange.max) : Infinity;
      if (!(price >= min && price <= max)) return false;
      return true;
    });
    setFinalItems(filtered);
  }, [termItems, filters, priceRange]);

  const toggleCheck = (fieldKey, optionValue) => {
    setFilters((prev) => {
      const current = new Set(prev[fieldKey] || []);
      if (current.has(optionValue)) current.delete(optionValue);
      else current.add(optionValue);
      return { ...prev, [fieldKey]: Array.from(current) };
    });
  };

  const clearFilters = () => {
    setFilters(Object.fromEntries(Object.keys(options.campos).map((k) => [k, []])));
    setPriceRange({ min: "", max: "" });
  };

  const countOptionsFor = (fieldKey) => {
    const counts = new Map();
    const allowedValues = new Set(options.campos[fieldKey]?.values || []);
    const passOther = (product) => {
      for (const [iterKey, selected] of Object.entries(filters)) {
        if (iterKey === fieldKey) continue;
        if (selected?.length) {
          const val = String(product?.[iterKey] ?? "").trim();
          if (!selected.includes(val)) return false;
        }
      }
      const price = Number(product.price) || 0;
      const min = priceRange.min !== "" ? Number(priceRange.min) : -Infinity;
      const max = priceRange.max !== "" ? Number(priceRange.max) : Infinity;
      return price >= min && price <= max;
    };
    for (const product of termItems) {
      if (!passOther(product)) continue;
      const val = String(product?.[fieldKey] ?? "").trim();
      if (!val || !allowedValues.has(val)) continue;
      counts.set(val, (counts.get(val) || 0) + 1);
    }
    return Object.fromEntries(counts.entries());
  };

  const orderedItems = sortItems(finalItems, sortBy);

  return (
    <div className="container py-4">
      
      <section className="cat-hero">
        <h1 className="h3">Resultados de búsqueda</h1>
        <p className="catalogo-intro">
          Mostrando resultados para <strong>“{decodedQuery}”</strong>.
        </p>
        <p className="text-muted-soft">
          {orderedItems.length} {orderedItems.length === 1 ? "artículo" : "artículos"} encontrados.
        </p>
      </section>

      
      <div className="catalog-toolbar">
        <button
          type="button"
          className="btn btn-outline-secondary d-flex align-items-center gap-2"
          onClick={() => setPanelOpen(true)}
        >
          <span className="bi bi-funnel" aria-hidden="true" />
          Filtrar
        </button>

        <div className="order-block">
          <span className="text-muted d-none d-sm-inline">Ordenar por:</span>
          <div className="dropdown" data-bs-auto-close="true">
            <button
              id="sortMenuBtn"
              type="button"
              className="btn btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
              aria-haspopup="true"
              aria-controls="sortMenu"
            >
              {labelSort(sortBy)}
            </button>
            <ul id="sortMenu" className="dropdown-menu dropdown-menu-end" aria-labelledby="sortMenuBtn">
              <li className="dropdown-header text-muted">Los más vendidos</li>
              <li>
                <button
                  className={`dropdown-item ${sortBy === "relevance" ? "active" : ""}`}
                  onClick={() => setSortBy("relevance")}
                >
                  Relevancia
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item ${sortBy === "name_asc" ? "active" : ""}`}
                  onClick={() => setSortBy("name_asc")}
                >
                  Nombre, A a Z
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item ${sortBy === "name_desc" ? "active" : ""}`}
                  onClick={() => setSortBy("name_desc")}
                >
                  Nombre, Z a A
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item ${sortBy === "price_asc" ? "active" : ""}`}
                  onClick={() => setSortBy("price_asc")}
                >
                  Precio: de más bajo a más alto
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item ${sortBy === "price_desc" ? "active" : ""}`}
                  onClick={() => setSortBy("price_desc")}
                >
                  Precio: de más alto a más bajo
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {cargando && <LoadingSpinner />}

      {!cargando && errorTexto && <div className="alert alert-danger">{errorTexto}</div>}

      {!cargando && !errorTexto && orderedItems.length === 0 && (
        <div className="alert alert-warning">
          No hay productos que coincidan con “{decodedQuery}”.{" "}
          <Link to="/catalogo/anillos">Ver catálogo</Link>
        </div>
      )}

      {!cargando && !errorTexto && orderedItems.length > 0 && (
        <div className="row g-3">
          {orderedItems.map((productItem) => {
            const estado = textoStock(productItem);
            const isNew = esNuevo(productItem);

            const keyVal =
              productItem?.id != null
                ? `p-${productItem.id}`
                : `s-${productItem?.slug ?? Math.random().toString(36).slice(2)}`;

            const precioNum = Number(productItem?.price) || 0;
            const [ent, dec] = precioNum.toFixed(2).split(".");

            return (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={keyVal}>
                <div
                  className="card h-100 position-relative catalog-card"
                  role="button"
                  tabIndex={0}
                  style={{ cursor: "pointer" }}
                  onClick={() => openProduct(productItem)}
                  onKeyDown={(e) => e.key === "Enter" && openProduct(productItem)}
                >
                  
                  <div className="position-absolute top-0 start-0 m-2 d-flex flex-column gap-2">
                    <span className={`badge ${estado.cls}`}>{estado.label}</span>
                  </div>

                  
                  <div
                    className="position-absolute top-0 end-0 m-2 d-flex flex-column align-items-end gap-2"
                    style={{ zIndex: 3 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="favorite-wrap">
                      <FavoriteButton itemId={productItem?.id} />
                    </div>
                    {isNew && <span className="badge bg-dark">Nuevo</span>}
                  </div>

                  
                  <div className="position-relative thumb">
                    <img
                      src={productItem?.url_image}
                      alt={productItem?.name || "Producto"}
                      className={`card-img-top ${estado.out ? "out-of-stock" : ""}`}
                      onError={handleImgError}
                    />
                  </div>

                 
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{productItem?.name || "Sin nombre"}</h5>
                    <p className="card-text small text-muted mb-2">
                      {productItem?.description || "Sin descripción."}
                    </p>
                    <div className="mt-auto">
                      <div className="price">
                        {ent}
                        <small>,{dec} €</small>
                      </div>
                      <button
                        className="btn btn-primary w-100 mt-2 add-btn"
                        onClick={(ev) => {
                          ev.stopPropagation();
                          if (!usuarioAutenticado) {
                            setMensajePorProducto((prev) => ({
                              ...prev,
                              [productItem?.id]: "Debes iniciar sesión para añadir productos 🛑",
                            }));
                            setTimeout(() => {
                              navigate("/login");
                            }, 1500);
                          } else {
                            addToCart(productItem?.id);
                            setMensajePorProducto((prev) => ({
                              ...prev,
                              [productItem?.id]: "Producto añadido al carrito ✅",
                            }));
                          }
                          setTimeout(() => {
                            setMensajePorProducto((prev) => ({
                              ...prev,
                              [productItem?.id]: false,
                            }));
                          }, 3000);
                        }}
                        disabled={estado.out}
                        title={estado.out ? "Sin stock" : "Añadir"}
                        aria-disabled={estado.out}
                      >
                        Añadir
                      </button>

                      {mensajePorProducto[productItem?.id] && (
                        <div className="alert alert-warning text-center mt-3">
                          {mensajePorProducto[productItem?.id]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      
      {panelOpen && (
        <>
          <div className="filtro-overlay" onClick={() => setPanelOpen(false)} />
          <aside className="filtro-drawer filtro-left" aria-label="Panel de filtros">
            <div className="filtro-header">
              <h2 className="h5 mb-0">Filtros</h2>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setPanelOpen(false)}
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className="filtro-body">
              {Object.entries(options.campos).map(([fieldKey, fieldInfo]) => {
                const counts = countOptionsFor(fieldKey);
                return (
                  <details key={fieldKey} open={["metal", "brand"].includes(fieldKey)}>
                    <summary className="filtro-summary">{fieldInfo.label}</summary>
                    {fieldInfo.values.map((val) => {
                      const total = counts[val] || 0;
                      const checked = (filters[fieldKey] || []).includes(val);
                      return (
                        <label key={val} className="filtro-check">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCheck(fieldKey, val)}
                            aria-checked={checked}
                          />
                          <span>
                            {val} <small className="text-muted">({total})</small>
                          </span>
                        </label>
                      );
                    })}
                  </details>
                );
              })}

              {termItems.length > 0 && (
                <details>
                  <summary className="filtro-summary">Precio</summary>
                  <div className="d-flex gap-2 align-items-center">
                    <input
                      type="number"
                      className="form-control"
                      placeholder={`mín. ${options.precioMin || 0}`}
                      value={priceRange.min}
                      onChange={(e) => setPriceRange((r) => ({ ...r, min: e.target.value }))}
                      min={0}
                      inputMode="decimal"
                    />
                    <span>—</span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder={`máx. ${options.precioMax || 0}`}
                      value={priceRange.max}
                      onChange={(e) => setPriceRange((r) => ({ ...r, max: e.target.value }))}
                      min={0}
                      inputMode="decimal"
                    />
                  </div>
                </details>
              )}
            </div>

            <div className="filtro-footer">
              <button className="btn btn-light" onClick={clearFilters}>
                Limpiar
              </button>
              <button className="btn btn-dark ms-auto" onClick={() => setPanelOpen(false)}>
                Ver resultados
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

export default SearchResults;
