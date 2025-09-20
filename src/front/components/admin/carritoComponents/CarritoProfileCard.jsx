import { useEffect } from "react";
import { substractCartProduct, SumCartProduct } from "../../../services/cartApi";
import "./carritoProfile.css";

export default function CarritoProfileCard({
    id,
    name,
    image,
    price,
    quantity,
    onRemove,
    fetchData
}) {
    const total = quantity * price

    const priceAmount = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(price)

    const totalAmount = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(total)

    const sumQuantity = async () => {
        await SumCartProduct(id)
        await fetchData()
    }

    const substractQuantity = async () => {
        await substractCartProduct(id)
        await fetchData()
    }

    return (
        <article className="product-card mb-1" aria-label={`Producto ${name}`}>
            <img src={image} alt={name} className="product-img" />

            <div className="product-info">
                <div className="product-header">
                    <h3 className="product-name">{name}</h3>
                    <p className="product-price">{priceAmount}</p>
                </div>

                <div className="product-footer">
                    <div className="quantity-controls" aria-live="polite">
                        <button
                            type="button"
                            className="qty-btn"
                            aria-label={`Restar una unidad a ${name}`}
                            disabled={quantity <= 0}
                            onClick={substractQuantity}
                        >
                            −
                        </button>

                        <div className="qty-value" aria-label={`Cantidad de ${name}`}>
                            {quantity}
                        </div>

                        <button
                            type="button"
                            className="qty-btn"
                            aria-label={`Sumar una unidad a ${name}`}
                            onClick={sumQuantity}
                        >
                            +
                        </button>
                    </div>

                    <div className="product-actions">
                        <div className="subtotal">
                            {totalAmount}
                        </div>
                        {onRemove && (
                            <button
                                className="remove-btn"
                                onClick={() => onRemove(id)}
                                aria-label={`Eliminar ${name}`}
                            >
                                Eliminar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}