import { useState } from "react";
import { ContactUs } from "./ContactUs";
import { Products } from "./Products";

export const NavAndTabs = () => {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div>
      <ul className="nav nav-tabs border-bottom-0">
        <li className="nav-item">
          <button
            className={`nav-link text-warning ${activeTab === "productos" ? "active" : ""}`}
            onClick={() => setActiveTab("productos")}
          >
            Productos
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link text-warning ${activeTab === "contacto" ? "active" : ""}`}
            onClick={() => setActiveTab("contacto")}
          >
            Contáctanos
          </button>
        </li>
      </ul>

      <div className="mt-3">
        {activeTab === "productos" && <Products />}
        {activeTab === "contacto" && <ContactUs />}
      </div>
    </div>
  );
};