import "./historialDePedidos.css"

export const HistorialDePedidosCard = ({
    id,
    total,
    quantity,
    date,
}) => {
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

    return (
        <article className="product-card mb-1" >

            <div className="product-info">
                <div className="product-header">
                    <h2 className="product-name">Pedido ID. {id}</h2>
                    <p className="product-price">Precio total:</p>
                </div>

                <div className="product-footer mt-2">
                    <p className="product-price">Cantidad total: {quantity}</p>
                    <p className="product-date">Fecha {legible}</p>

                    <div className="product-actions">
                        <div className="subtotal">
                            {totalAmount}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}