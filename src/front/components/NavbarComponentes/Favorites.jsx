import { Link } from "react-router-dom";

export const Favorites = () => {
  return (
    <div className="dropdown mt-2">
      <button
        className="btn btn-outline-light dropdown-toggle border-dark"
        type="button"
        id="favoritesDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="bi bi-heart text-warning" />
        <span className="ms-1 d-none d-md-inline text-warning">Favoritos</span>
      </button>

      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
        <li><Link className="dropdown-item" to="/favoritos">Ver todos</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><span className="dropdown-item text-muted">No hay favoritos aún</span></li>
      </ul>
    </div>
  );
};