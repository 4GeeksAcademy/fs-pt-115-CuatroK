import { Link } from "react-router-dom";
import "./historialDePedidos.css"
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
        <Link to={!user.is_admin ? `/sale/${id}` : `/sale-detail/${id}`} className="no-style-link">
            <article className="product-card mb-1">
                <div className="product-info">
                    <div className="product-header">
                        <h2 className="product-name">Pedido ID. {id}</h2>
                        <p className="product-price">Precio total:</p>
                    </div>

                    <div className="product-footer mt-2">
                        <p className="product-price">Cantidad total: {quantity}</p>
                        <p className="product-date">Fecha {legible}</p>

                        <div className="product-actions">
                            <div className="subtotal">{totalAmount}</div>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}