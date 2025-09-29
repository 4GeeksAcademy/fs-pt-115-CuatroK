import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getJoyasSearch, updateJewell } from "../../../services/jewellsService";
import LoadingSpinner from "../../../components/public/LoadingSpinner";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");

export const ProductPageAdmin = () => {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [currentProduct, setCurrentProduct] = useState()

    const { idOrSlug } = useParams()

    const getJoyas = async () => {
        try {
            setLoading(true);
            const data = await getJoyasSearch();

            const productFound = data.find(
                (product) =>
                    String(product.id) === String(idOrSlug) ||
                    String(product.slug || "").toLowerCase() ===
                    String(idOrSlug).toLowerCase()
            );

            if (productFound) {
                setCurrentProduct(productFound);
                setFormData(productFound);
            } else {
                setCurrentProduct(null);
                setFormData(null);
            }
        } catch (err) {
            console.error("Error al obtener joyas:", err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getJoyas()
    }, [idOrSlug]);

    console.log(formData);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        await updateJewell(idOrSlug, formData, setSaving)
    };

    if (loading) return <LoadingSpinner />
    if (!formData) return <LoadingSpinner />
    return (
        <div
            className="products-card"
            style={{
                backgroundColor: "#eed9c4",
                padding: "30px",
                borderRadius: "12px",
                maxWidth: "800px",
                margin: "auto",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
        >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Editar Joya</h2>
            <form onSubmit={handleSubmit}>
                {/* Nombre */}
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

                {/* Descripción */}
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

                {/* Precio */}
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

                {/* Cantidad */}
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

                {/* URL Imagen */}
                <label>URL de Imagen</label>
                <input
                    type="text"
                    name="url_image"
                    value={formData.url_image || ""}
                    onChange={handleChange}
                    className="input"
                />

                {/* Categoría */}
                <label>
                    Categoría <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </label>
                <select
                    name="category"
                    value={formData.category || ""}
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

                {/* Destacado */}
                <label style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                    <input
                        type="checkbox"
                        name="highlighted"
                        checked={formData.highlighted || false}
                        onChange={handleChange}
                        style={{ marginRight: "8px" }}
                    />
                    Destacado
                </label>

                <button
                    type="submit"
                    style={{
                        backgroundColor: "#d4af37",
                        color: "#fff",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "8px",
                        marginTop: "20px",
                        cursor: "pointer",
                        width: "100%",
                    }}
                    disabled={saving}
                >
                    {saving ? "Guardando..." : "Guardar Cambios"}
                </button>
            </form>

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
