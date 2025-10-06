
import { useState } from "react";
import { Link } from "react-router-dom";
import { Profile } from "./NavbarComponentes/Profile";
import { SearchBar } from "./NavbarComponentes/SearchBar";
import { ShoppingCart } from "./NavbarComponentes/ShoppingCart";
import { NavAndTabs } from "./NavbarComponentes/NavAndTabs";
import "./navbarStyles.css";
import { useAuth } from "../hooks/useAuth";
import { Favorites } from "./NavbarComponentes/Favorites";
import FuzzyText from './effects/FuzzyText.jsx';

export const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { user, token } = useAuth();
  const usuarioAutenticado = token;

  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: "#4a4a4a" }}>
        <div className="d-flex justify-content-between align-items-center w-100 px-3">


          <button
            className="navbar-toggler d-lg-none mb-3"
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Toggle navigation"
          >
            <span >☰</span>
          </button>

          {
            user ? (
              user.gender === "Demagogo" ? (
                <div className="navbar-logo d-none d-lg-block text-danger my-auto">
                  <Link to={"/demagogo"}>
                    <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true}>
                      Sé un demagogo...
                    </FuzzyText>
                  </Link>
                </div>
              ) : (
                <div className="navbar-logo d-none d-lg-block">
                  <Link to="/">
                    <img src="/logo4k.png" alt="Logo" style={{ width: 50, height: 44 }} />
                  </Link>
                </div>
              )
            ) : (
              <div className="navbar-logo d-none d-lg-block">
                <Link to="/">
                  <img src="/logo4k.png" alt="Logo" style={{ width: 50, height: 44 }} />
                </Link>
              </div>
            )
          }


          <div className="d-flex align-items-center gap-2 fixed-nav-tools">
            <SearchBar />
            {usuarioAutenticado && <Favorites />}
            <ShoppingCart />
            <Profile />
          </div>
        </div>


        {
          menuAbierto && (
            <div className="d-lg-none px-3 py-2"> 
              <NavAndTabs />
            </div>
          )
        }

        {/* Menú visible directamente en pantallas grandes */}
        <div className="d-none d-lg-flex justify-content-between align-items-center">
          <NavAndTabs />
        </div>
      </nav >
    </div >
  );
};
