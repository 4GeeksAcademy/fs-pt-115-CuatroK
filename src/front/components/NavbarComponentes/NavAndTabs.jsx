import { useState } from "react";
import { ContactUs } from "./ContactUs";
import { Products } from "./Products";

export const NavAndTabs = () => {
  const [activeTab, setActiveTab] = useState(null);

  return (

    <div>
      <button
        className={`btn btn-warning me-2 text-warning ${activeTab === "productos" ? "active" : ""}`}
        onClick={() => setActiveTab("productos")} 
        style={{ backgroundColor: ' #5C3D2E' }}
      >
        Productos
      </button>
      <button
        className={`btn btn-warning text-warning ${activeTab === "contacto" ? "active" : ""}`}
        onClick={() => setActiveTab("contacto")}
        style={{ backgroundColor: ' #5C3D2E' }}
      >
        Contactanos
      </button>
      <div className="mt-3">
        {activeTab === "productos" && <Products />}
        {activeTab === "contacto" && <ContactUs />}
      </div>
    </div>



    
  );
};