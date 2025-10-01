// src/front/components/public/Favorites.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getJoyasSearch } from "../../services/jewellsService";
import { removeFavorite } from "../../services/serviceApi";

const getFavId = (f) => {
  if (typeof f === "number" || typeof f === "string") return Number(f) || f;
  return f?.id ?? f?.jewell_id ?? f?.jewel_id ?? f?.product_id ?? null;
};

const euro = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });

export const Favorites = () => {
  const { token, user } = useAuth();

  const initialIds = useMemo(
    () => (Array.isArray(user?.favorites) ? user.favorites.map(getFavId).filter(Boolean) : []),
    [user]
  );

  const [favIds, setFavIds] = useState(initialIds);
  const [allProducts, setAllProducts] = useState([]);
  const [favItems, setFavItems] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await getJoyasSearch();
        const list = Array.isArray(data) ? data : data?.items ?? [];
        if (alive) setAllProducts(list);
      } catch {
        if (alive) setAllProducts([]);
      }
    })();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const byId = new Map(allProducts.map((p) => [Number(p.id) || p.id, p]));
    setFavItems(favIds.map((id) => byId.get(Number(id) || id)).filter(Boolean));
  }, [favIds, allProducts]);

  useEffect(() => {
    const handler = (ev) => {
      const { changedId, isFav } = ev.detail || {};
      if (!changedId) return;
      setFavIds((prev) => {
        const s = new Set(prev);
        isFav ? s.add(changedId) : s.delete(changedId);
        return Array.from(s);
      });
    };
    window.addEventListener("favorites:changed", handler);
    return () => window.removeEventListener("favorites:changed", handler);
  }, []);

  const onRemove = async (id) => {
    try {
      if (token) await removeFavorite(token, id);
    } catch {}
    setFavIds((prev) => prev.filter((x) => String(x) !== String(id)));
    window.dispatchEvent(new CustomEvent("favorites:changed", { detail: { changedId: id, isFav: false } }));
  };

  return (
    <div className="dropdown mt-2">
      <button
        className="btn btn-outline-light dropdown-toggle border-dark d-inline-flex align-items-center"
        type="button"
        id="favoritesDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >

        <i className="bi bi-heart text-warning" style={{ fontSize: 20, lineHeight: 1 }} />
        <p className="m-0 ms-2 d-none d-md-inline text-warning">Favoritos</p>
        <p className="m-0 ms-2 fw-bold text-warning">{favIds.length}</p>


      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="favoritesDropdown"
        style={{ minWidth: 320, maxWidth: 360 }}
      >
        {favItems.length === 0 ? (
          <li>
            <p className="dropdown-item text-muted m-0">No hay favoritos aún</p>
          </li>
        ) : (
          favItems.slice(0, 8).map((p) => {
            const link = `/producto/${encodeURIComponent(p.slug || p.id)}`;
            return (
              <li key={p.id} className="px-2">
                <div className="d-flex align-items-center gap-2">
                  <Link
                    to={link}
                    className="d-flex align-items-center text-decoration-none flex-grow-1 p-1 rounded"
                    style={{ minWidth: 0 }}
                  >
                    <img
                      src={p.url_image}
                      alt={p.name || "Producto"}
                      width={40}
                      height={40}
                      style={{ objectFit: "cover", borderRadius: 6 }}
                      onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/80?text=?"; }}
                    />
                    <div className="ms-2 d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
                      <p className="text-truncate mb-0" title={p.name}>
                        {p.name || `Producto #${p.id}`}
                      </p>
                      <p className="text-muted mb-0" style={{ fontSize: 12 }}>
                        {euro.format(p.price || 0)}
                      </p>
                    </div>
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove(p.id); }}
                    aria-label="Quitar de favoritos"
                  >
                    <i className="bi bi-trash" />
                  </button>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};
