import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { postJewell } from "../../../services/jewellsService";

export const PostProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        url_image: "",
        category: "",
        coating: "",
        brand: "",
        gender: "",
        clasp: "",
        water_resistance: "",
        caja: "",
        metal: "",
        gem: "",
        ring_type: "",
        earring_type: "",
        bracelet: "",
        watch: "",
        watch_bracelet_material: "",
        highlighted: false,
        quantity: 1,
    });
    const [loading, setLoading] = useState(false);
    const [inputsMissing, setInputsMissing] = useState(false);
    const [successful, setSuccessful] = useState("");
    const [categorySelected, setCategorySelected] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "category") {
            setCategorySelected(value);
        }
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessful("");

        if (!formData.name || !formData.description || !formData.price || !formData.quantity) {
            setInputsMissing(true);
            return;
        }
        setInputsMissing(false);

        try {
            await postJewell(formData, setLoading, setSuccessful);
            setFormData({
                name: "",
                description: "",
                price: "",
                url_image: "",
                category: "",
                coating: "",
                brand: "",
                gender: "",
                clasp: "",
                water_resistance: "",
                caja: "",
                metal: "",
                gem: "",
                ring_type: "",
                earring_type: "",
                bracelet: "",
                watch: "",
                watch_bracelet_material: "",
                highlighted: false,
                quantity: 1,
            });
            setCategorySelected("");
        } catch (error) {
            console.error(error);
        }
    };

    // Configuración de qué campos mostrar por categoría
    const fieldsByCategory = {
        relojes: ["brand", "gender", "water_resistance", "caja", "watch_bracelet_material"],
        colgantes: ["coating", "brand", "gender", "clasp", "metal", "gem"],
        pulseras: ["coating", "brand", "gender", "clasp", "metal", "gem", "bracelet"],
        pendientes: ["coating", "brand", "gender", "metal", "gem", "earring_type"],
        anillo: ["coating", "brand", "gender", "metal", "gem", "ring_type"],
    };

    const renderField = (field) => {
        const labels = {
            coating: "Baño / Recubrimiento",
            brand: "Marca",
            gender: "Género",
            clasp: "Cierre",
            water_resistance: "Resistencia al Agua",
            caja: "Caja",
            metal: "Metal",
            gem: "Piedra Preciosa",
            ring_type: "Tipo de Anillo",
            earring_type: "Tipo de Arete",
            bracelet: "Brazalete",
            watch_bracelet_material: "Material del Brazalete del Reloj",
        };

        return (
            <div key={field}>
                <label>{labels[field]}</label>
                <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="input"
                />
            </div>
        );
    };

    return (
        <div className="page-background-color" style={{ minHeight: "100vh", padding: "40px" }}>
            {/* Overlay de carga */}
            {loading && (
                <div className="loading-overlay d-flex justify-content-center align-items-center">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="products-card"
                style={{
                    backgroundColor: "#f5f0e6",
                    padding: "30px",
                    borderRadius: "12px",
                    bordeRadius: "0.75rem",
                    border: "1px solid #f1e0b3",
                    maxWidth: "800px",
                    margin: "auto",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#333" }}>
                    ➕ Agregar nueva joya
                </h2>

                {/* Campos obligatorios */}
                <label>
                    Nombre <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input"
                />

                <label>
                    Descripción <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input"
                    rows={3}
                />

                <label>
                    Precio <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </label>
                <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input"
                />

                <label>
                    URL de Imagen <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </label>
                <input
                    type="text"
                    name="url_image"
                    value={formData.url_image}
                    onChange={handleChange}
                    className="input"
                />

                <label>
                    Categoría <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input"
                    required
                >
                    <option value="" disabled hidden>
                        -- Selecciona una categoría --
                    </option>
                    <option value="relojes">Relojes</option>
                    <option value="colgantes">Colgantes</option>
                    <option value="pulseras">Pulseras</option>
                    <option value="pendientes">Pendientes</option>
                    <option value="anillo">Anillo</option>
                </select>

                {/* Campos dinámicos */}
                {categorySelected && (
                    <div style={{ marginTop: "20px" }}>
                        <h4 style={{ color: "#333" }}>Detalles adicionales</h4>
                        {fieldsByCategory[categorySelected]?.map((field) => renderField(field))}
                    </div>
                )}

                {/* Extras */}
                <div style={{ marginTop: "20px" }}>
                    <label>
                        <input
                            type="checkbox"
                            name="highlighted"
                            checked={formData.highlighted}
                            onChange={handleChange}
                        />{" "}
                        Destacado
                    </label>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <label>
                        Cantidad <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        min="1"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="input"
                    />
                </div>

                {/* Mensajes de validación */}
                {inputsMissing && (
                    <div className="alert alert-danger text-center" role="alert">
                        ¡Te faltan datos importantes por rellenar!
                    </div>
                )}

                {successful && successful === "Joya creada satisfactoriamente" && (
                    <div className="alert alert-success text-center" role="alert">
                        {successful}
                    </div>
                )}
                {successful && successful === "Hubo un error en la creación de la joya" && (
                    <div className="alert alert-danger text-center" role="alert">
                        {successful}
                    </div>
                )}

                <button
                    type="submit"
                    className="color-buttons"
                    style={{
                        marginTop: "30px",
                        padding: "12px 20px",
                        border: "none",
                        borderRadius: "8px",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                        cursor: "pointer",
                        display: "block",
                        width: "100%",
                    }}
                >
                    Guardar Joya
                </button>
            </form>

            {/* Estilos inline extra */}
            <style>{`
        .input {
          width: 100%;
          padding: 8px 10px;
          margin-top: 5px;
          margin-bottom: 15px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
        }
        .input:focus {
          border-color: #d4af37;
          outline: none;
          box-shadow: 0 0 4px rgba(212, 175, 55, 0.6);
        }
      `}</style>
        </div>
    );
};