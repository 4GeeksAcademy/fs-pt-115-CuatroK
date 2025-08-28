import { NavLink } from "react-router-dom";

export const NavAndTabs = () => {
  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink
            to="/productos"
            className={({ isActive }) =>
              `nav-link text-warning ${isActive ? "active" : ""}`
            }
          >
            Productos
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link text-warning ${isActive ? "active" : ""}`
            }
          >
            Contáctanos
          </NavLink>
        </li>
      </ul>
    </div>
  );
};