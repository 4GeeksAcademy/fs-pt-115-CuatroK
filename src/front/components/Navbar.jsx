
import { useState } from "react";
import { Link } from "react-router-dom";
import { Profile } from "./NavbarComponentes/Profile";
import { SearchBar } from "./NavbarComponentes/SearchBar";
import { ShoppingCart } from "./NavbarComponentes/ShoppingCart";
import { NavAndTabs } from "./NavbarComponentes/NavAndTabs";
import "./navbarStyles.css";

export const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  

  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: "#5C3D2E" }}>
        <div className="d-flex justify-content-between align-items-center w-100 px-3">

          {/* Botón hamburguesa visible solo en pantallas pequeñas */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Toggle navigation"
          >
            <span >☰</span>
          </button>

          {/* Logo centrado */}
          <div className="navbar-logo d-none d-lg-block">
            <Link to="/">
              <img
                src="https://media.discordapp.net/attachments/1409165086697848872/1410329949633642556/LogoEntero.PNG?ex=68b68e5e&is=68b53cde&hm=ff73ccf8bfef9e0e99242e20a380d812cd8a38ba672c3daa85877141bed33574&=&format=webp&quality=lossless&width=360&height=334"
                alt="Logo"
                style={{ width: 50, height: 44 }}
              />
            </Link>
          </div>

          {/* Herramientas fijas */}
          <div className="d-flex align-items-center gap-2 fixed-nav-tools">
            <SearchBar />
            <ShoppingCart />
            <Profile />
          </div>
        </div>

        {/* Menú desplegable en pantallas pequeñas */}
        {menuAbierto && (
          <div className="d-lg-none px-3 py-2">
            <NavAndTabs />
          </div>
        )}

        {/* Menú visible directamente en pantallas grandes */}
        <div className="d-none d-lg-flex justify-content-between align-items-center">
          <NavAndTabs />
        </div>
      </nav>
    </div>
  );
};
