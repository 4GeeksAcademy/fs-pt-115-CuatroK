import "./historialDePedidos.css"

export const HistorialDePedidosCard = ({
    id,
    total,
    item,
    date,
}) => {

    return (
        <article className="product-card mb-1" >

            <div className="product-info">
                <div className="product-header">
                    <h2 className="product-name">Pedido ID. {id}</h2>
                    <p className="product-price">Precio total:</p>
                </div>

                <div className="product-footer mt-2">
                    <p className="product-price">Cantidad total: {}</p>
                    <p className="product-date">Fecha {date}</p>

                    <div className="product-actions">
                        <div className="subtotal">
                            {total}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}