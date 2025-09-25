
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


          <button
            className="navbar-toggler d-lg-none mb-3"
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Toggle navigation"
          >
            <span >☰</span>
          </button>


          <div className="navbar-logo d-none d-lg-block">
            <Link to="/">
              <img
                src="/logo4k.png"
                alt="Logo"
                style={{ width: 50, height: 44 }}
              />
            </Link>
          </div>


          <div className="d-flex align-items-center gap-2 fixed-nav-tools">
            <SearchBar/>
            <ShoppingCart />
            <Profile />
          </div>
        </div>


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
