import { useState } from "react";
import { ContactUs } from "./ContactUs";
import { Products } from "./Products";
export const NavAndTabs = () => {
  const [activeTab, setActiveTab] = useState(null);
  return (
    <div>
      <button className={`btn btn-warning me-2 text-light border-0 ms-3 ${activeTab === "productos" ? "active" : ""} mt-1`}
        onClick={() => setActiveTab("productos")}
        style={{ backgroundColor: ' #4a4a4a' }} > Productos
      </button> <button
        className={`btn btn-warning text-light border-0 ${activeTab === "contacto" ? "active" : ""} mt-1`}
        onClick={() => setActiveTab("contacto")}
        style={{ backgroundColor: ' #4a4a4a' }} > Contactanos
      </button> <div className="mt-3"> {activeTab === "productos" && <Products />} {activeTab === "contacto" && <ContactUs />}
      </div>
    </div>
  );
};  