import React, { useMemo, useState } from "react";
import "./Style_Catalogo.css";


const PRODUCTS = [
  {
    id: 1,
    name: 'Pulsera "crystal" blanca',
    description: "Plata de ley con circonitas blancas.",
    price: 55,
    url_image: "https://m.media-amazon.com/images/I/51DHugShjML._UY1000_.jpg",
    category: "Pulsera",
    quantity: 12,
    highlighted: true,
  },
  {
    id: 2,
    name: 'Pulsera "crystal" roja',
    description: "Plata de ley con circonitas rojas.",
    price: 55,
    url_image: "https://m.media-amazon.com/images/I/51DHugShjML._UY1000_.jpg",
    category: "Pulsera",
    quantity: 7,
    highlighted: true,
  },
  {
    id: 3,
    name: "Pulsera Figaro",
    description: "Cadena estilo figaro con circonitas.",
    price: 74,
    url_image: "https://m.media-amazon.com/images/I/51DHugShjML._UY1000_.jpg",
    category: "Pulsera",
    quantity: 0,
    highlighted: false,
  },
  {
    id: 4,
    name: "Pulsera Valparaíso",
    description: "Multicolor con baño de rodio.",
    price: 54,
    url_image: "https://m.media-amazon.com/images/I/51DHugShjML._UY1000_.jpg",
    category: "Pulsera",
    quantity: 5,
    highlighted: false,
  },
  {
    id: 5,
    name: "Reloj Clásico",
    description: "Acero inoxidable, esfera minimalista.",
    price: 89,
    url_image: "https://m.media-amazon.com/images/I/51DHugShjML._UY1000_.jpg",
    category: "Reloj",
    quantity: 3,
    highlighted: false,
  },
  {
    id: 6,
    name: "Anillo Solitario",
    description: "Circonia central, acabado brillante.",
    price: 39,
    url_image: "https://m.media-amazon.com/images/I/51DHugShjML._UY1000_.jpg",
    category: "Anillo",
    quantity: 10,
    highlighted: true,
  },
];

const EURO = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });


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
            <span className="fw-bold">{EURO.format(product.price ?? 0)}</span>
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
  // Controles UI
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("relevance"); // relevance | priceAsc | priceDesc
  const [onlyHighlighted, setOnlyHighlighted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = useMemo(() => {
    const set = new Set(PRODUCTS.map(p => p.category).filter(Boolean));
    return ["", ...Array.from(set)]; // "" = todas
  }, []);

 
  const visibleProducts = useMemo(() => {
    const q = searchText.trim().toLowerCase();

    let out = PRODUCTS.filter((p) => {
      const matchesSearch =
        !q ||
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q);

      const matchesHighlighted = !onlyHighlighted || Boolean(p.highlighted);
      const matchesCategory = !selectedCategory || p.category === selectedCategory;

      return matchesSearch && matchesHighlighted && matchesCategory;
    });

    if (sortOption === "priceAsc") out.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sortOption === "priceDesc") out.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
   
    return out;
  }, [searchText, onlyHighlighted, sortOption, selectedCategory]);

  return (
    <div className="container py-4">
      {/* Cabecera + filtros */}
      <div className="d-flex flex-column flex-md-row gap-3 align-items-md-end justify-content-between mb-3">
        <div>
          <h2 className="mb-1">Catálogo</h2>
          <p className="text-muted mb-0">
            Datos locales (sin API). Cámbialos por los tuyos cuando quieras.
          </p>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <input
            className="form-control"
            placeholder="Buscar por nombre, descripción o categoría…"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ minWidth: 220 }}
          />

          <select
            className="form-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevance">Ordenar: relevancia</option>
            <option value="priceAsc">Precio: más bajo</option>
            <option value="priceDesc">Precio: más alto</option>
          </select>

          <div className="form-check d-flex align-items-center ms-1">
            <input
              id="onlyHighlighted"
              className="form-check-input"
              type="checkbox"
              checked={onlyHighlighted}
              onChange={(e) => setOnlyHighlighted(e.target.checked)}
            />
            <label htmlFor="onlyHighlighted" className="form-check-label ms-1">
              Solo destacados
            </label>
          </div>

          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            title="Categoría"
          >
            <option value="">Todas las categorías</option>
            {categories
              .filter((c) => c) // quita el vacío ya puesto arriba
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="row">
        {visibleProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}

        {visibleProducts.length === 0 && (
          <div className="col-12 text-center text-muted py-5">
            No hay productos que coincidan.
          </div>
        )}
      </div>
    </div>
  );
}
