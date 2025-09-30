import { Link } from "react-router-dom";
import "./historialDePedidos.css"
import "../profile.css"
import { useAuth } from "../../../hooks/useAuth";

export const HistorialDePedidosCard = ({
    id,
    total,
    quantity,
    date,
}) => {
    const { user } = useAuth()
    const fecha = new Date(date);
    const legible = fecha.toLocaleString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const totalAmount = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(total)
    console.log(user)
    return (
        <Link
            to={!user.is_admin ? `/sale/${id}` : `/sale-detail/${id}`}
            className="no-style-link"
        >
            <article className="profile-card mb-3">
                <div className="profile-form ">

                    {/* Encabezado */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h2 className="card-title fw-bold fs-4">Pedido ID. {id}</h2>
                        <p className="info fs-5">Precio total:</p>
                    </div>

                    {/* Pie con detalles */}
                    <div className="product-footer mt-3 text-center">
                        <p className="info mt-3">Cantidad total: {quantity}</p>
                        <p className="info mt-3">Fecha {legible}</p>

                        <div className="highlight mt-3 py-2 px-3 fs-4 rounded">
                            {totalAmount}
                        </div>
                    </div>

                </div>
            </article>
        </Link>
    );
}