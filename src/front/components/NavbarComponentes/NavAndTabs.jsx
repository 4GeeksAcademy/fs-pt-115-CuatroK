import { useState } from "react";
import { ContactUs } from "./ContactUs";
import { Products } from "./Products";
export const NavAndTabs = () => {
  const [activeTab, setActiveTab] = useState(null);
  return (
    <div>
      <button className={`btn btn-warning me-2 text-dark border-0 ${activeTab === "productos" ? "active" : ""} mt-1`}
        onClick={() => setActiveTab("productos")}
        style={{ backgroundColor: ' #e8e3dc' }} > Productos
      </button> <button
        className={`btn btn-warning text-dark border-0 ${activeTab === "contacto" ? "active" : ""} mt-1`}
        onClick={() => setActiveTab("contacto")}
        style={{ backgroundColor: ' #e8e3dc' }} > Contactanos
      </button> <div className="mt-3"> {activeTab === "productos" && <Products />} {activeTab === "contacto" && <ContactUs />}
      </div>
    </div>
  );
};  