import React, { useState } from "react";
import "./Style_Catalogo.css"; 


const DATA = [
  {
    id: 1,
    titulo: 'Pulsera plata y circonitas "crystal" (blanca)',
    precio: 55,
    precioOriginal: 110,
    nuevo: true,
    descuento: 50,
    imagen: "https://via.placeholder.com/600?text=Pulsera+Blanca",
  },
  {
    id: 2,
    titulo: 'Pulsera plata y circonitas "crystal" (roja)',
    precio: 55,
    precioOriginal: 110,
    nuevo: true,
    descuento: 50,
    imagen: "https://via.placeholder.com/600?text=Pulsera+Roja",
  },
  {
    id: 3,
    titulo: 'Pulsera plata y circonitas "figaro"',
    precio: 74,
    precioOriginal: 148,
    nuevo: false,
    descuento: 50,
    imagen: "https://via.placeholder.com/600?text=Pulsera+Figaro",
  },
  {
    id: 4,
    titulo: 'Pulsera "valparaíso"',
    precio: 54,
    precioOriginal: 108,
    nuevo: false,
    descuento: 50,
    imagen: "https://via.placeholder.com/600?text=Pulsera+Valparaiso",
  },
];


const EUR = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });

function ProductCard({ item, favs, setFavs }) {
  const esFavorito = favs.includes(item.id);

  const toggleFav = () => {
    if (esFavorito) {
      setFavs(favs.filter((x) => x !== item.id));
    } else {
      setFavs([...favs, item.id]);
    }
  };

  return (
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <div className="card card-product position-relative h-100 border-0 shadow-sm">
        {/* Etiquetas arriba: NUEVO y % */}
        {item.nuevo && <span className="badge bg-dark badge-corner start-0">Nuevo</span>}
        {item.descuento > 0 && (
          <span className="badge bg-danger badge-corner end-0">-{item.descuento}%</span>
        )}

        
        <div className="ratio ratio-1x1 bg-white">
          <img src={item.imagen} alt={item.titulo} className="p-3 img-fluid object-fit-contain" />
        </div>

        
        <button type="button" className="btn btn-light btn-like" onClick={toggleFav} title="Favorito">
          {esFavorito ? "♥" : "♡"}
        </button>

        
        <div className="card-body">
          <div className="small text-muted">Pulseras</div>
          <div className="card-title fw-semibold title-2lines">{item.titulo}</div>

          <div className="d-flex align-items-baseline gap-2">
            <span className="fw-bold">{EUR.format(item.precio)}</span>
            {item.precioOriginal > item.precio && (
              <span className="text-muted text-decoration-line-through">
                {EUR.format(item.precioOriginal)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Catalogo() {
  
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("relevancia");
  const [soloNuevos, setSoloNuevos] = useState(false);
  const [favoritos, setFavoritos] = useState([]); // ids

  
  let lista = DATA.filter((p) =>
    p.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );
  if (soloNuevos) lista = lista.filter((p) => p.nuevo);

  if (orden === "precioAsc") lista.sort((a, b) => a.precio - b.precio);
  if (orden === "precioDesc") lista.sort((a, b) => b.precio - a.precio);

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row gap-3 align-items-md-end justify-content-between mb-3">
        <div>
          <h2 className="mb-1">Catálogo (versión estudiante)</h2>
          <p className="text-muted mb-0">Ejemplo con React + Bootstrap, fácil de modificar.</p>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <input
            className="form-control"
            placeholder="Buscar…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ minWidth: 220 }}
          />

          <select
            className="form-select"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="relevancia">Ordenar: relevancia</option>
            <option value="precioAsc">Precio: más bajo</option>
            <option value="precioDesc">Precio: más alto</option>
          </select>

          <div className="form-check d-flex align-items-center ms-1">
            <input
              id="soloNuevos"
              className="form-check-input"
              type="checkbox"
              checked={soloNuevos}
              onChange={(e) => setSoloNuevos(e.target.checked)}
            />
            <label htmlFor="soloNuevos" className="form-check-label ms-1">
              Solo nuevos
            </label>
          </div>
        </div>
      </div>

      
      <div className="row">
        {lista.map((item) => (
          <ProductCard key={item.id} item={item} favs={favoritos} setFavs={setFavoritos} />
        ))}

        {lista.length === 0 && (
          <div className="col-12 text-center text-muted py-5">
            No hay productos que coincidan.
          </div>
        )}
      </div>
    </div>
  );
}
