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
    const [loading, setLoading] = useState()
    const [inputsMissing, setInputsMissing] = useState()
    const [successful, setSuccessful] = useState()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessful("")

        if (!formData.name || !formData.description || !formData.price || !formData.quantity) {
            setInputsMissing(true)
            return;
        }
        setInputsMissing(false)
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
        } catch (error) {
            console.error(error)
        }
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
                    maxWidth: "900px",
                    margin: "auto",
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#333" }}>
                    ➕ Agregar nueva joya
                </h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px",
                    }}
                >
                    {/* Columna 1 */}
                    <div>
                        <label>Nombre <span style={{ color: "red", fontWeight: "bold" }}>*</span></label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input"
                        />

                        <label>Descripción <span style={{ color: "red", fontWeight: "bold" }}>*</span></label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="input"
                            rows={3}
                        />

                        <label>Precio <span style={{ color: "red", fontWeight: "bold" }}>*</span></label>
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="input"
                        />

                        <label>URL de Imagen <span style={{ color: "red", fontWeight: "bold" }}>*</span></label>
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

                        <label>Baño / Recubrimiento</label>
                        <input
                            type="text"
                            name="coating"
                            value={formData.coating}
                            onChange={handleChange}
                            className="input"
                        />

                        <label>Marca</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    {/* Columna 2 */}
                    <div>
                        <label>Género</label>
                        <input
                            type="text"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="input"
                        />

                        <label>Cierre</label>
                        <input
                            type="text"
                            name="clasp"
                            value={formData.clasp}
                            onChange={handleChange}
                            className="input"
                        />

                        <label>Resistencia al Agua</label>
                        <input
                            type="text"
                            name="water_resistance"
                            value={formData.water_resistance}
                            onChange={handleChange}
                            className="input"
                        />

                        <label>Caja</label>
                        <input
                            type="text"
                            name="caja"
                            value={formData.caja}
                            onChange={handleChange}
                            className="input"
                        />

                        <label>Metal</label>
                        <input
                            type="text"
                            name="metal"
                            value={formData.metal}
                            onChange={handleChange}
                            className="input"
                        />

                        <label>Piedra Preciosa</label>
                        <input
                            type="text"
                            name="gem"
                            value={formData.gem}
                            onChange={handleChange}
                            className="input"
                        />

                        <label>Tipo de Anillo</label>
                        <input
                            type="text"
                            name="ring_type"
                            value={formData.ring_type}
                            onChange={handleChange}
                            className="input"
                        />

                        <label>Tipo de Arete</label>
                        <input
                            type="text"
                            name="earring_type"
                            value={formData.earring_type}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>
                </div>

                {/* Fila adicional */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: "20px",
                        marginTop: "20px",
                    }}
                >
                    <div>
                        <label>Brazalete</label>
                        <input
                            type="text"
                            name="bracelet"
                            value={formData.bracelet}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    <div>
                        <label>Reloj</label>
                        <input
                            type="text"
                            name="watch"
                            value={formData.watch}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    <div>
                        <label>Material del Brazalete del Reloj</label>
                        <input
                            type="text"
                            name="watch_bracelet_material"
                            value={formData.watch_bracelet_material}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>
                </div>

                {/* Opciones finales */}
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
                {inputsMissing && (
                    <div className="alert alert-danger text-center" role="alert">
                        ¡Te faltan datos importantes por rellenar!
                    </div>)
                }

                {successful && (
                    <div className="alert alert-success text-center" role="alert">
                        {successful}
                    </div>)
                }

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
