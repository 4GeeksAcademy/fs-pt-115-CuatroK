import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJoyasSearch, updateJewell, deleteJewell } from "../../../services/jewellsService";
import LoadingSpinner from "../../../components/public/LoadingSpinner";

const LABELS = {
    name: "Nombre",
    description: "Descripción",
    price: "Precio",
    quantity: "Cantidad",
    url_image: "URL de Imagen",
    highlighted: "Destacado",
    brand: "Marca",
    coating: "Baño / Recubrimiento",
    gender: "Género",
    clasp: "Cierre",
    water_resistance: "Resistencia al Agua",
    caja: "Caja",
    metal: "Metal",
    gem: "Piedra Preciosa",
    ring_type: "Tipo de Anillo",
    earring_type: "Tipo de Arete",
    bracelet: "Brazalete",
    watch: "Reloj",
    watch_bracelet_material: "Material del Brazalete del Reloj",
    category: "Categoría",
};

export const ProductPageAdmin = () => {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [currentProduct, setCurrentProduct] = useState()
    const [updateSuccessfull, setUpdateSuccessfull] = useState("")
    const [deleting, setDeleting] = useState(false)
    const { idOrSlug } = useParams()
    const navigate = useNavigate()

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

    const deleteJewellAsync = async () => {
        await deleteJewell(idOrSlug, setDeleting)
        navigate("/product-list")
    }

    useEffect(() => {
        getJoyas()
    }, [idOrSlug]);

    console.log(formData);


    const handleChange = (e) => {
        setUpdateSuccessfull("")
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        await updateJewell(idOrSlug, formData, setSaving, setUpdateSuccessfull)
    };

    if (loading) return <LoadingSpinner />
    if (!formData) return <LoadingSpinner />
    return (
        <div className="vh-100">

            <div
                className="products-card mt-5"
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
                {
                    deleting && (
                        <div className="loading-overlay d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    )
                }
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Editar Joya</h2>
                <form onSubmit={handleSubmit}>
                    {Object.entries(formData)
                        .filter(([key, value]) => {
                            if (value === null) return false;
                            if (typeof value === "string" && value.trim() === "") return false;
                            return true;
                        })
                        .map(([key, value]) => (
                            <div key={key} style={{ marginBottom: "12px" }}>
                                <label style={{ display: "block", marginBottom: "4px" }}>
                                    {LABELS[key] || key}
                                </label>

                                {typeof value === "boolean" ? (
                                    <input
                                        type="checkbox"
                                        name={key}
                                        checked={!!value}
                                        onChange={handleChange}
                                    />
                                ) : key === "description" ? (
                                    <textarea
                                        name={key}
                                        value={value}
                                        onChange={handleChange}
                                        className="input"
                                        rows={3}
                                    />
                                ) : (
                                    <input
                                        type={typeof value === "number" ? "number" : "text"}
                                        name={key}
                                        value={value}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                )}
                            </div>
                        ))}

                    {updateSuccessfull && (
                        <div
                            className={`alert text-center ${updateSuccessfull.includes("correctamente")
                                ? "alert-success"
                                : "alert-danger"
                                }`}
                            role="alert"
                        >
                            {updateSuccessfull}
                        </div>
                    )}

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
                    <button
                        type="button"
                        style={{
                            backgroundColor: "#9b2626ff",
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
                        onClick={deleteJewellAsync}
                    >
                        {saving ? "Cargando..." : "Eliminar joya"}
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
        </div >
    );
};
