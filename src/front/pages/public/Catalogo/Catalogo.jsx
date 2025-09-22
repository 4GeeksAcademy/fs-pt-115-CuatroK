
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJoyasSearch } from "../../../services/jewellsService";
import "./Style_Catalogo.css";


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
  const navigate = useNavigate();

  const [cargando, setCargando] = useState(false);
  const [errorTexto, setErrorTexto] = useState("");

 
  const [productosBase, setProductosBase] = useState([]);

  
  const [panelAbierto, setPanelAbierto] = useState(false);

  
  const [filtros, setFiltros] = useState({});

  
  const [rangoPrecio, setRangoPrecio] = useState({ min: "", max: "" });

  
  let tituloCategoria = category || "";
  try { tituloCategoria = decodeURIComponent(tituloCategoria); } catch {}

  
  const abrirProducto = (productoItem) => {
    const idOSlug = productoItem?.slug ? productoItem.slug : String(productoItem?.id ?? "");
    navigate(`/producto/${encodeURIComponent(idOSlug)}`);
  };

  const formatearPrecio = (valorPrecio) => {
    const numeroPrecio = Number(valorPrecio);
    if (Number.isNaN(numeroPrecio)) return "—";
    return `${numeroPrecio.toFixed(2)} €`;
  };

  const coincideCategoria = (categoriaProducto, categoriaElegida) => {
    const textoCategoriaProducto = String(categoriaProducto || "").trim().toLowerCase();
    const textoCategoriaElegida = String(categoriaElegida || "").trim().toLowerCase();
    const categoriaPlural = textoCategoriaElegida.endsWith("s")
      ? textoCategoriaElegida
      : textoCategoriaElegida + "s";
    const categoriaSingular = textoCategoriaElegida.endsWith("s")
      ? textoCategoriaElegida.slice(0, -1)
      : textoCategoriaElegida;
    return (
      textoCategoriaProducto === textoCategoriaElegida ||
      textoCategoriaProducto === categoriaPlural ||
      textoCategoriaProducto === categoriaSingular
    );
  };

  
  useEffect(() => {
    let componenteVivo = true;
    (async () => {
      setCargando(true);
      setErrorTexto("");
      setProductosBase([]);
      setFiltros({});
      setRangoPrecio({ min: "", max: "" });

      try {
        const todasLasJoyas = await getJoyasSearch();
        const listaPorCategoria = (todasLasJoyas || []).filter((productoItem) =>
          coincideCategoria(productoItem?.category, tituloCategoria)
        );
        if (!componenteVivo) return;
        setProductosBase(listaPorCategoria);
        if (listaPorCategoria.length === 0) setErrorTexto(`No hay productos en “${tituloCategoria}”.`);
      } catch (errorCarga) {
        if (!componenteVivo) return;
        setErrorTexto(errorCarga?.message || "Error al cargar las joyas.");
      } finally {
        if (componenteVivo) setCargando(false);
      }
    })();
    return () => { componenteVivo = false; };
  }, [category]);

    
  const opciones = useMemo(() => {
    const obtenerUnicosOrdenados = (arregloValores) =>
      [...new Set(arregloValores.filter((valor) => valor != null && String(valor).trim() !== ""))].sort(
        (valorA, valorB) => String(valorA).localeCompare(String(valorB))
      );

    const camposConOpciones = {};
    CANDIDATE_FIELDS.forEach((campoCandidato) => {
      const valoresCampo = obtenerUnicosOrdenados(productosBase.map((productoItem) => productoItem?.[campoCandidato]));
      if (valoresCampo.length > 0) {
        camposConOpciones[campoCandidato] = { label: LABELS[campoCandidato] || campoCandidato, values: valoresCampo };
      }
    });

    const listaPrecios = productosBase.map((productoItem) => Number(productoItem.price) || 0);
    const precioMinimoDisponible = listaPrecios.length ? Math.min(...listaPrecios) : 0;
    const precioMaximoDisponible = listaPrecios.length ? Math.max(...listaPrecios) : 0;

    return { campos: camposConOpciones, precioMin: precioMinimoDisponible, precioMax: precioMaximoDisponible };
  }, [productosBase]);

  
  useEffect(() => {
    setFiltros((filtrosPrevios) => {
      const filtrosNormalizados = {};
      Object.keys(opciones.campos).forEach((campoClave) => {
        const seleccionesAnteriores = filtrosPrevios[campoClave] || [];
        const valoresPermitidos = new Set(opciones.campos[campoClave].values);
        filtrosNormalizados[campoClave] = seleccionesAnteriores.filter((valorSeleccionado) =>
          valoresPermitidos.has(valorSeleccionado)
        );
      });
      return filtrosNormalizados;
    });
  }, [opciones.campos]);

  
  const productosFiltrados = useMemo(() => {
    return (productosBase || []).filter((productoItem) => {
      // 1) filtros por facetas
      for (const [campoClave, listaSeleccion] of Object.entries(filtros)) {
        if (listaSeleccion?.length) {
          const valorProductoEnCampo = String(productoItem?.[campoClave] ?? "").trim();
          if (!listaSeleccion.includes(valorProductoEnCampo)) return false;
        }
      }
      
      const precioProducto = Number(productoItem.price) || 0;
      const precioMinimoSeleccion = rangoPrecio.min !== "" ? Number(rangoPrecio.min) : -Infinity;
      const precioMaximoSeleccion = rangoPrecio.max !== "" ? Number(rangoPrecio.max) : Infinity;
      if (!(precioProducto >= precioMinimoSeleccion && precioProducto <= precioMaximoSeleccion)) return false;

      return true;
    });
  }, [productosBase, filtros, rangoPrecio]);

  
  const toggleCheck = (campoClave, valorOpcion) => {
    setFiltros((filtrosPrevios) => {
      const conjuntoActual = new Set(filtrosPrevios[campoClave] || []);
      if (conjuntoActual.has(valorOpcion)) conjuntoActual.delete(valorOpcion);
      else conjuntoActual.add(valorOpcion);
      return { ...filtrosPrevios, [campoClave]: Array.from(conjuntoActual) };
    });
  };

  const limpiarFiltros = () => {
    setFiltros(Object.fromEntries(Object.keys(opciones.campos).map((campoClave) => [campoClave, []])));
    setRangoPrecio({ min: "", max: "" });
  };

  
  const contarOpcionesDe = (campoClave) => {
    const conteoPorValor = new Map(); // valor -> cantidad
    const valoresPosibles = new Set(opciones.campos[campoClave]?.values || []);

    const pasaOtrosFiltros = (productoItem) => {
      for (const [campoIterado, listaSeleccion] of Object.entries(filtros)) {
        if (campoIterado === campoClave) continue; // ignoro el campo que estoy contando
        if (listaSeleccion?.length) {
          const valorProducto = String(productoItem?.[campoIterado] ?? "").trim();
          if (!listaSeleccion.includes(valorProducto)) return false;
        }
      }
      const precioProducto = Number(productoItem.price) || 0;
      const precioMinimoSeleccion = rangoPrecio.min !== "" ? Number(rangoPrecio.min) : -Infinity;
      const precioMaximoSeleccion = rangoPrecio.max !== "" ? Number(rangoPrecio.max) : Infinity;
      if (!(precioProducto >= precioMinimoSeleccion && precioProducto <= precioMaximoSeleccion)) return false;

      return true;
    };

    for (const productoItem of productosBase) {
      if (!pasaOtrosFiltros(productoItem)) continue;
      const valorCampo = String(productoItem?.[campoClave] ?? "").trim();
      if (!valorCampo || !valoresPosibles.has(valorCampo)) continue;
      conteoPorValor.set(valorCampo, (conteoPorValor.get(valorCampo) || 0) + 1);
    }

    return Object.fromEntries(conteoPorValor.entries());
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="mb-0">Catálogo: {tituloCategoria}</h1>

        
        <button
          type="button"
          className="btn btn-outline-secondary d-flex align-items-center gap-2"
          onClick={() => setPanelAbierto(true)}
        >
          <span className="bi bi-funnel" aria-hidden="true" />
          Filtrar
        </button>
      </div>

      {cargando && <p>Cargando {tituloCategoria}…</p>}

      {!cargando && errorTexto && (
        <div className="alert alert-danger">{errorTexto}</div>
      )}

      {!cargando && !errorTexto && productosFiltrados.length === 0 && (
        <div className="alert alert-warning">No hay productos que coincidan con los filtros.</div>
      )}

      {!cargando && productosFiltrados.length > 0 && (
        <div className="row g-3">
          {productosFiltrados.map((productoItem) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={productoItem?.id ?? `${productoItem?.slug ?? "sin-id"}`}
            >
              <div
                className="card h-100 position-relative"
                role="button"
                tabIndex={0}
                style={{ cursor: "pointer" }}
                onClick={() => abrirProducto(productoItem)}
                onKeyDown={(eventoTeclado) => eventoTeclado.key === "Enter" && abrirProducto(productoItem)}
              >
                <img
                  src={productoItem?.url_image}
                  alt={productoItem?.name || "Producto"}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: 200 }}
                  onError={(eventoImagen) => {
                    eventoImagen.currentTarget.src =
                      "https://via.placeholder.com/600x400?text=Sin+imagen";
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{productoItem?.name || "Sin nombre"}</h5>
                  <p className="card-text small text-muted mb-2">
                    {productoItem?.description || "Sin descripción."}
                  </p>
                  <div className="mt-auto">
                    <div className="fw-bold">{formatearPrecio(productoItem?.price)}</div>
                    <button
                      className="btn btn-primary w-100 mt-2"
                      onClick={(eventoBoton) => {
                        eventoBoton.stopPropagation();
                        console.log("[Catalogo] Añadir al carrito:", productoItem?.id);
                      }}
                    >
                      Añadir
                    </button>
                  </div>
                </div>
                {productoItem?.highlighted && (
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

      
      {panelAbierto && (
        <>
          <div className="filtro-overlay" onClick={() => setPanelAbierto(false)} />
          <aside className="filtro-drawer filtro-left" aria-label="Panel de filtros">
            <div className="filtro-header">
              <h2 className="h5 mb-0">Filtros</h2>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setPanelAbierto(false)}
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className="filtro-body">
              
              {Object.entries(opciones.campos).map(([campoClave, infoCampo]) => {
                const conteosCampo = contarOpcionesDe(campoClave); // números por opción
                return (
                  <details key={campoClave} open={["metal", "brand"].includes(campoClave)}>
                    <summary className="filtro-summary">{infoCampo.label}</summary>
                    {infoCampo.values.map((valorOpcion) => {
                      const cantidadCoincidente = conteosCampo[valorOpcion] || 0;
                      return (
                        <label key={valorOpcion} className="filtro-check">
                          <input
                            type="checkbox"
                            checked={(filtros[campoClave] || []).includes(valorOpcion)}
                            onChange={() => toggleCheck(campoClave, valorOpcion)}
                          />
                          <span>
                            {valorOpcion}{" "}
                            <small className="text-muted">({cantidadCoincidente})</small>
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
                      onChange={(eventoCambio) =>
                        setRangoPrecio((rangoActual) => ({ ...rangoActual, min: eventoCambio.target.value }))
                      }
                      min={0}
                    />
                    <span>—</span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder={`máx. ${opciones.precioMax || 0}`}
                      value={rangoPrecio.max}
                      onChange={(eventoCambio) =>
                        setRangoPrecio((rangoActual) => ({ ...rangoActual, max: eventoCambio.target.value }))
                      }
                      min={0}
                    />
                  </div>
                </details>
              )}
            </div>

            <div className="filtro-footer">
              <button className="btn btn-light" onClick={limpiarFiltros}>
                Limpiar
              </button>
              <button
                className="btn btn-dark ms-auto"
                onClick={() => setPanelAbierto(false)}
              >
                Ver resultados
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
};
