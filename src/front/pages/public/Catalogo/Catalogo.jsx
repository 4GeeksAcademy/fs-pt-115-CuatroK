import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJoyasSearch } from "../../../services/jewellsService";
import "./Style_Catalogo.css";
import LoadingSpinner from "../../../components/public/LoadingSpinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Dropdown } from "bootstrap";
import { useCart } from "../../../hooks/useFetch";
import { useAuth } from "../../../hooks/useAuth";
import FavoriteButton from "../../../components/public/FavoriteButton.jsx";
import CategoryIntro from "../CategoryIntro/CategoryIntro.jsx";

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

export const Catalogo = () => {
    const { category } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();
    const usuarioAutenticado = !!token;

    const [cargando, setCargando] = useState(false);
    const [errorTexto, setErrorTexto] = useState("");
    const [productosBase, setProductosBase] = useState([]);
    const [panelAbierto, setPanelAbierto] = useState(false);
    const [filtros, setFiltros] = useState({});
    const [rangoPrecio, setRangoPrecio] = useState({ min: "", max: "" });
    const [opciones, setOpciones] = useState({ campos: {}, precioMin: 0, precioMax: 0 });
    const [productosFiltrados, setProductosFiltrados] = useState([]);
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

    let tituloCategoria = category || "";
    try { tituloCategoria = decodeURIComponent(tituloCategoria); } catch { }

    const abrirProducto = (productoItem) => {
        const idOSlug = productoItem?.slug ? productoItem.slug : String(productoItem?.id ?? "");
        navigate(`/producto/${encodeURIComponent(idOSlug)}`);
    };

    const coincideCategoria = (catProd, catElegida) => {
        const a = String(catProd || "").trim().toLowerCase();
        const b = String(catElegida || "").trim().toLowerCase();
        const plural = b.endsWith("s") ? b : b + "s";
        const singular = b.endsWith("s") ? b.slice(0, -1) : b;
        return a === b || a === plural || a === singular;
    };

    useEffect(() => {
        let vivo = true;
        (async () => {
            setCargando(true);
            setErrorTexto("");
            setProductosBase([]);
            setFiltros({});
            setRangoPrecio({ min: "", max: "" });
            try {
                const all = await getJoyasSearch();
                const lista = (all || []).filter((p) => coincideCategoria(p?.category, tituloCategoria));
                if (!vivo) return;
                setProductosBase(lista);
                if (lista.length === 0) setErrorTexto(`No hay productos en “${tituloCategoria}”.`);
            } catch (e) {
                if (!vivo) return;
                setErrorTexto(e?.message || "Error al cargar las joyas.");
            } finally {
                if (vivo) setCargando(false);
            }
        })();
        return () => { vivo = false; };
    }, [category]);

    useEffect(() => {
        const uniqueSorted = (arr) =>
            [...new Set(arr.filter((v) => v != null && String(v).trim() !== ""))].sort((a, b) =>
                String(a).localeCompare(String(b))
            );
        const campos = {};
        CANDIDATE_FIELDS.forEach((key) => {
            const values = uniqueSorted(productosBase.map((p) => p?.[key]));
            if (values.length) campos[key] = { label: LABELS[key] || key, values };
        });
        const precios = productosBase.map((p) => Number(p.price) || 0);
        const precioMin = precios.length ? Math.min(...precios) : 0;
        const precioMax = precios.length ? Math.max(...precios) : 0;
        setOpciones({ campos, precioMin, precioMax });
    }, [productosBase]);


    useEffect(() => {
        setFiltros((prev) => {
            const next = {};
            Object.keys(opciones.campos).forEach((k) => {
                const oldSel = prev[k] || [];
                const allowed = new Set(opciones.campos[k].values);
                next[k] = oldSel.filter((v) => allowed.has(v));
            });
            return next;
        });
    }, [opciones.campos]);


    useEffect(() => {
        const filtrados = (productosBase || []).filter((p) => {
            for (const [k, sel] of Object.entries(filtros)) {
                if (sel?.length) {
                    const val = String(p?.[k] ?? "").trim();
                    if (!sel.includes(val)) return false;
                }
            }
            const price = Number(p.price) || 0;
            const min = rangoPrecio.min !== "" ? Number(rangoPrecio.min) : -Infinity;
            const max = rangoPrecio.max !== "" ? Number(rangoPrecio.max) : Infinity;
            if (!(price >= min && price <= max)) return false;
            return true;
        });
        setProductosFiltrados(filtrados);
    }, [productosBase, filtros, rangoPrecio]);

    const toggleCheck = (k, val) => {
        setFiltros((prev) => {
            const set = new Set(prev[k] || []);
            if (set.has(val)) set.delete(val);
            else set.add(val);
            return { ...prev, [k]: Array.from(set) };
        });
    };

    const limpiarFiltros = () => {
        setFiltros(Object.fromEntries(Object.keys(opciones.campos).map((k) => [k, []])));
        setRangoPrecio({ min: "", max: "" });
    };


    const contarOpcionesDe = (campoClave) => {
        const counts = new Map();
        const allowed = new Set(opciones.campos[campoClave]?.values || []);
        const pasaOtros = (p) => {
            for (const [k, sel] of Object.entries(filtros)) {
                if (k === campoClave) continue;
                if (sel?.length) {
                    const val = String(p?.[k] ?? "").trim();
                    if (!sel.includes(val)) return false;
                }
            }
            const price = Number(p.price) || 0;
            const min = rangoPrecio.min !== "" ? Number(rangoPrecio.min) : -Infinity;
            const max = rangoPrecio.max !== "" ? Number(rangoPrecio.max) : Infinity;
            return price >= min && price <= max;
        };
        for (const p of productosBase) {
            if (!pasaOtros(p)) continue;
            const val = String(p?.[campoClave] ?? "").trim();
            if (!val || !allowed.has(val)) continue;
            counts.set(val, (counts.get(val) || 0) + 1);
        }
        return Object.fromEntries(counts.entries());
    };

    const labelSort = (key) =>
        key === "name_asc" ? "Nombre, A a Z"
            : key === "name_desc" ? "Nombre, Z a A"
                : key === "price_asc" ? "Precio: de más bajo a más alto"
                    : key === "price_desc" ? "Precio: de más alto a más bajo"
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

    const orderedItems = sortItems(productosFiltrados, sortBy);
    const { addToCart } = useCart();

    const esNuevo = (producto) => {
        const raw = producto?.published_at || producto?.created_at || producto?.createdAt;
        if (!raw) return false;
        const fecha = new Date(raw);
        if (isNaN(fecha.getTime())) return false;
        const diffMin = (Date.now() - fecha.getTime()) / 1000 / 60;
        return diffMin < 60;
    };

    const textoStock = (producto) => {
        const qty = Number(producto?.quantity ?? 0);
        if (qty <= 0) return { label: "Sin stock", cls: "text-bg-danger", out: true };
        if (qty < 10) return { label: "Últimas unidades", cls: "text-bg-warning", out: false };
        return { label: "Stock", cls: "text-bg-success", out: false };
    };

    return (
        <div className="container py-4">

            <section className="cat-hero">
                <CategoryIntro category={category} />
            </section>

            <div className="catalog-toolbar">
                <button
                    type="button"
                    className="btn btn-outline-secondary d-flex align-items-center gap-2"
                    onClick={() => setPanelAbierto(true)}
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
                            <li><button className={`dropdown-item ${sortBy === "relevance" ? "active" : ""}`} onClick={() => setSortBy("relevance")}>Relevancia</button></li>
                            <li><button className={`dropdown-item ${sortBy === "name_asc" ? "active" : ""}`} onClick={() => setSortBy("name_asc")}>Nombre, A a Z</button></li>
                            <li><button className={`dropdown-item ${sortBy === "name_desc" ? "active" : ""}`} onClick={() => setSortBy("name_desc")}>Nombre, Z a A</button></li>
                            <li><button className={`dropdown-item ${sortBy === "price_asc" ? "active" : ""}`} onClick={() => setSortBy("price_asc")}>Precio: de más bajo a más alto</button></li>
                            <li><button className={`dropdown-item ${sortBy === "price_desc" ? "active" : ""}`} onClick={() => setSortBy("price_desc")}>Precio: de más alto a más bajo</button></li>
                        </ul>
                    </div>
                </div>
            </div>

            {cargando && <LoadingSpinner />}

            {!cargando && errorTexto && <div className="alert alert-danger">{errorTexto}</div>}

            {!cargando && !errorTexto && orderedItems.length === 0 && (
                <div className="alert alert-warning">No hay productos que coincidan con los filtros.</div>
            )}

            {!cargando && !errorTexto && orderedItems.length > 0 && (
                <div className="row g-3">
                    {orderedItems.map((productoItem) => {
                        const estado = textoStock(productoItem);
                        const isNew = esNuevo(productoItem);

                        const keyVal =
                            productoItem?.id != null
                                ? `p-${productoItem.id}`
                                : `s-${productoItem?.slug ?? Math.random().toString(36).slice(2)}`;

                        const precioNum = Number(productoItem?.price) || 0;
                        const [ent, dec] = precioNum.toFixed(2).split(".");

                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={keyVal}>
                                <div
                                    className="card h-100 position-relative catalog-card"
                                    role="button"
                                    tabIndex={0}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => abrirProducto(productoItem)}
                                    onKeyDown={(e) => e.key === "Enter" && abrirProducto(productoItem)}
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
                                            <FavoriteButton itemId={productoItem?.id} />
                                        </div>
                                        {isNew && <span className="badge bg-dark">Nuevo</span>}
                                    </div>


                                    <div className="position-relative thumb">
                                        <img
                                            src={productoItem?.url_image}
                                            alt={productoItem?.name || "Producto"}
                                            className={`card-img-top ${estado.out ? "out-of-stock" : ""}`}
                                            onError={handleImgError}
                                        />
                                    </div>


                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{productoItem?.name || "Sin nombre"}</h5>
                                        <p className="card-text small text-muted mb-2">
                                            {productoItem?.description || "Sin descripción."}
                                        </p>
                                        <div className="mt-auto">
                                            <div className="price">{ent}<small>,{dec} €</small></div>
                                            <button
                                                className="btn btn-primary w-100 mt-2 add-btn"
                                                onClick={(ev) => {
                                                    ev.stopPropagation();
                                                    if (!usuarioAutenticado) {
                                                        setMensajePorProducto((prev) => ({
                                                            ...prev,
                                                            [productoItem?.id]: "Debes iniciar sesión para añadir productos 🛑",
                                                        }));
                                                        setTimeout(() => { navigate("/login"); }, 1500);
                                                    } else {
                                                        addToCart(productoItem?.id);
                                                        setMensajePorProducto((prev) => ({
                                                            ...prev,
                                                            [productoItem?.id]: "Producto añadido al carrito ✅",
                                                        }));
                                                    }
                                                    setTimeout(() => {
                                                        setMensajePorProducto((prev) => ({ ...prev, [productoItem?.id]: false }));
                                                    }, 3000);
                                                }}
                                                disabled={estado.out}
                                                title={estado.out ? "Sin stock" : "Añadir"}
                                                aria-disabled={estado.out}
                                            >
                                                Añadir
                                            </button>

                                            {mensajePorProducto[productoItem?.id] && (
                                                <div className="alert alert-warning text-center mt-3">
                                                    {mensajePorProducto[productoItem?.id]}
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


            {panelAbierto && (
                <>
                    <div className="filtro-overlay" onClick={() => setPanelAbierto(false)} />
                    <aside className="filtro-drawer filtro-left" aria-label="Panel de filtros">
                        <div className="filtro-header">
                            <h2 className="h5 mb-0">Filtros</h2>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => setPanelAbierto(false)} aria-label="Cerrar">
                                ✕
                            </button>
                        </div>

                        <div className="filtro-body">
                            {Object.entries(opciones.campos).map(([campoClave, infoCampo]) => {
                                const conteosCampo = contarOpcionesDe(campoClave);
                                return (
                                    <details key={campoClave} open={["metal", "brand"].includes(campoClave)}>
                                        <summary className="filtro-summary">{infoCampo.label}</summary>
                                        {infoCampo.values.map((valorOpcion) => {
                                            const cantidad = conteosCampo[valorOpcion] || 0;
                                            const checked = (filtros[campoClave] || []).includes(valorOpcion);
                                            return (
                                                <label key={valorOpcion} className="filtro-check">
                                                    <input
                                                        type="checkbox"
                                                        checked={checked}
                                                        onChange={() => toggleCheck(campoClave, valorOpcion)}
                                                        aria-checked={checked}
                                                    />
                                                    <span>
                                                        {valorOpcion} <small className="text-muted">({cantidad})</small>
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </details>
                                );
                            })}

                            {productosBase.length > 0 && (
                                <details>
                                    <summary className="filtro-summary">Precio</summary>
                                    <div className="d-flex gap-2 align-items-center">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder={`mín. ${opciones.precioMin || 0}`}
                                            value={rangoPrecio.min}
                                            onChange={(e) => setRangoPrecio((r) => ({ ...r, min: e.target.value }))}
                                            min={0}
                                            inputMode="decimal"
                                        />
                                        <span>—</span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder={`máx. ${opciones.precioMax || 0}`}
                                            value={rangoPrecio.max}
                                            onChange={(e) => setRangoPrecio((r) => ({ ...r, max: e.target.value }))}
                                            min={0}
                                            inputMode="decimal"
                                        />
                                    </div>
                                </details>
                            )}
                        </div>

                        <div className="filtro-footer">
                            <button className="btn btn-light" onClick={limpiarFiltros}>Limpiar</button>
                            <button className="btn btn-dark ms-auto" onClick={() => setPanelAbierto(false)}>Ver resultados</button>
                        </div>
                    </aside>
                </>
            )}
        </div>
    );
};

export default Catalogo;
