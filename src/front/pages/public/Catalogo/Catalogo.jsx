import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Style_Catalogo.css";

// src/front/pages/Catalogo/Catalogo.jsx
import { fetchProducts } from '../../../services/serviceApiCatalogo.js';




const EURO_FORMAT = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });

function ProductCard({ product }) {
  const isInStock = (product.quantity ?? 0) > 0;

  return (
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 border-0 shadow-sm position-relative">
        {product.highlighted && (
          <span className="badge bg-dark position-absolute top-0 start-0 m-2">Nuevo</span>
        )}

        <div className="ratio ratio-1x1 bg-white">
          <img
            src={product.url_image || "https://via.placeholder.com/600?text=Producto"}
            alt={product.name}
            className="p-3 img-fluid object-fit-contain"
          />
        </div>

        <div className="card-body">
          <div className="small text-muted">{product.category || "Sin categoría"}</div>
          <h6 className="fw-semibold title-2lines mb-2">{product.name}</h6>

          <div className="d-flex align-items-baseline gap-2">
            <span className="fw-bold">{EURO_FORMAT.format(product.price ?? 0)}</span>
          </div>

          <div className="mt-1 small">
            Stock:{" "}
            <span className={isInStock ? "text-success" : "text-danger"}>
              {isInStock ? product.quantity : "Sin stock"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Catalogo() {
  // Controles de interfaz
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("relevance"); // relevance | priceAsc | priceDesc
  const [onlyHighlighted, setOnlyHighlighted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Estado de datos
  const [productsFromApi, setProductsFromApi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const requestControllerRef = useRef(null);

  // Cargar productos desde la API (permite filtrar por categoría en el servidor)
  useEffect(() => {
    if (requestControllerRef.current) requestControllerRef.current.abort();
    const abortController = new AbortController();
    requestControllerRef.current = abortController;

    setIsLoading(true);
    setErrorMessage("");

    fetchProducts(
      {
        // Envía solo filtros que soporte tu backend como query params:
        // category, brand, metal, gender, etc. Aquí usamos category como ejemplo:
        category: selectedCategory || undefined,
      },
      abortController.signal
    )
      .then((products) => setProductsFromApi(products))
      .catch((error) => {
        if (error.name !== "AbortError") setErrorMessage(error.message || "Error al cargar productos");
      })
      .finally(() => setIsLoading(false));

    return () => abortController.abort();
  }, [selectedCategory]);

  // Filtrado/ordenación en cliente (para búsqueda, “solo nuevos” y orden de precio)
  const visibleProducts = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    let filteredProducts = productsFromApi.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name?.toLowerCase().includes(normalizedSearch) ||
        product.description?.toLowerCase().includes(normalizedSearch) ||
        product.category?.toLowerCase().includes(normalizedSearch);

      const matchesHighlighted = !onlyHighlighted || Boolean(product.highlighted);

      return matchesSearch && matchesHighlighted;
    });

    if (sortOption === "priceAsc") {
      filteredProducts.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sortOption === "priceDesc") {
      filteredProducts.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }
    // relevance: dejamos el orden como viene

    return filteredProducts;
  }, [productsFromApi, searchText, onlyHighlighted, sortOption]);

  return (
    <div className="container py-4">
      {/* Cabecera + controles */}
      <div className="d-flex flex-column flex-md-row gap-3 align-items-md-end justify-content-between mb-3">
        <div>
          <h2 className="mb-1">Catálogo</h2>
          <p className="text-muted mb-0">Conectado a tu API Flask.</p>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <input
            className="form-control"
            placeholder="Buscar por nombre, descripción o categoría…"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            style={{ minWidth: 220 }}
          />

          <select
            className="form-select"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            <option value="relevance">Ordenar: relevancia</option>
            <option value="priceAsc">Precio: más bajo</option>
            <option value="priceDesc">Precio: más alto</option>
          </select>

          <div className="form-check d-flex align-items-center ms-1">
            <input
              id="checkboxOnlyHighlighted"
              className="form-check-input"
              type="checkbox"
              checked={onlyHighlighted}
              onChange={(event) => setOnlyHighlighted(event.target.checked)}
            />
            <label htmlFor="checkboxOnlyHighlighted" className="form-check-label ms-1">
              Solo destacados
            </label>
          </div>

          {/* Filtro de catálogo que sí va al servidor (ejemplo: categoría) */}
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="">Todas las categorías</option>
            <option value="Anillo">Anillo</option>
            <option value="Pulsera">Pulsera</option>
            <option value="Reloj">Reloj</option>
            {/* Puedes llenar este select pidiendo /categories a tu API si quieres */}
          </select>
        </div>
      </div>

      {/* Mensajes de carga y error */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {isLoading && <div className="py-5 text-center text-muted">Cargando productos…</div>}

      {/* Listado de productos */}
      {!isLoading && (
        <div className="row">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {visibleProducts.length === 0 && (
            <div className="col-12 text-center text-muted py-5">No hay productos que coincidan.</div>
          )}
        </div>
      )}
    </div>
  );
}
