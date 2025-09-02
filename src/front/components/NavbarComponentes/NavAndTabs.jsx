import { useState } from "react";
import { ContactUs } from "./ContactUs";
import { Products } from "./Products";

export const NavAndTabs = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = (tab) => {
    setActiveTab(tab);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }}
    >
      <div>
        <button
          className={`btn btn-warning me-2 text-warning border-0 ${activeTab === "productos" ? "active" : ""}`}
          onMouseEnter={() => handleMouseEnter("productos")}
          style={{ backgroundColor: '#5C3D2E' }}
        >
          Productos
        </button>
        <button
          className={`btn btn-warning text-warning border-0 ${activeTab === "contacto" ? "active" : ""}`}
          onMouseEnter={() => handleMouseEnter("contacto")}
          style={{ backgroundColor: '#5C3D2E' }}
        >
          Contáctanos
        </button>
      </div>

      <div className="mt-3">
        {isHovering && activeTab === "productos" && <Products />}
        {isHovering && activeTab === "contacto" && <ContactUs />}
      </div>
    </div>
  );
};