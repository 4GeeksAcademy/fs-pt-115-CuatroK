import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getJoyasSearch } from "../../services/jewellsService";
import { removeFavorite } from "../../services/serviceApi";
import "./Favorites.css";

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
        className="btn dropdown-toggle d-inline-flex align-items-center favorites-btn"
        type="button"
        id="favoritesDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-heart me-2" />
        <span className="d-none d-md-inline">Favoritos</span>
        <span className="fav-count ms-2">{favIds.length}</span>
      </button>

      <ul
        className="dropdown-menu dropdown-menu-end favorites-menu"
        aria-labelledby="favoritesDropdown"
        style={{ minWidth: 340, maxWidth: 380 }}
      >
        {favItems.length === 0 ? (
          <li>
            <p className="dropdown-item m-0 text-center text-muted">No hay favoritos aún</p>
          </li>
        ) : (
          favItems.slice(0, 8).map((p) => {
            const link = `/producto/${encodeURIComponent(p.slug || p.id)}`;
            return (
              <li key={p.id} className="px-2">
                <div className="d-flex align-items-center gap-2 favorites-item">
                  <Link
                    to={link}
                    className="d-flex align-items-center text-decoration-none flex-grow-1 p-1 rounded"
                    style={{ minWidth: 0 }}
                  >
                    <img
                      src={p.url_image}
                      alt={p.name || "Producto"}
                      width={44}
                      height={44}
                      style={{ objectFit: "cover", borderRadius: 8 }}
                      onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/88?text=?"; }}
                    />
                    <div className="ms-2 d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
                      <span className="title text-truncate" title={p.name}>
                        {p.name || `Producto #${p.id}`}
                      </span>
                      <span className="price">{euro.format(p.price || 0)}</span>
                    </div>
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger remove-btn"
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