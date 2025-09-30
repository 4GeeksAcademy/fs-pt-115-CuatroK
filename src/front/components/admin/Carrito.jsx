import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CarritoProfileCard from "../admin/carritoComponents/CarritoProfileCard";
import { getDiscount } from "../../services/serviceApi";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useFetch";
import { removeCartItem } from "../../services/cartApi";

export const Carrito = () => {
    const { token, setDiscount, discount, setFinalAmount, finalAmount } = useAuth();
    const { cartItems, fetchCart } = useCart(); // 👈 traemos carrito global
    const [showCouponInput, setShowCouponInput] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [couponMessage, setCouponMessage] = useState("");

    // cargar carrito inicial
    useEffect(() => {
        if (token) fetchCart();
    }, [token]);

    // recalcular totales cuando cambie el carrito
    useEffect(() => {
        if (cartItems.length > 0) {
            const total = cartItems.reduce(
                (acc, item) => acc + item.jewell.price * item.quantity,
                0
            );
            setDiscount(0);
            setTotalAmount(total);
            setFinalAmount(total);
        } else {
            setTotalAmount(0);
            setFinalAmount(0);
        }
    }, [cartItems, setDiscount, setFinalAmount]);

    const getDiscountData = async () => {
        const data = await getDiscount(token);
        return data;
    };

    const handleApplyCoupon = async () => {
        const data = await getDiscountData();
        const discountData = data.find((d) => d.discount_code === coupon);

        if (discountData) {
            const discountValue = totalAmount * (discountData.total / 100);
            setDiscount(discountValue);
            setFinalAmount(totalAmount - discountValue);
            setCouponMessage("Cupón aplicado correctamente");
        } else {
            setDiscount(0);
            setFinalAmount(totalAmount);
            setCouponMessage("Cupón no válido");
        }
    };

    const formattedTotal = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(finalAmount || totalAmount);

    const handleRemove = async (id) => {
        await removeCartItem(id);
        await fetchCart();
    };


    return (
        <div>
            <h2>Carrito</h2>

            {cartItems.length === 0 ? (
                <h3 className="products-card text-center py-5 my-3">
                    Tu carrito está vacío...
                </h3>
            ) : (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-7 me-5 mb-5 products-card p-4">
                            {[...cartItems]
                                .sort((a, b) => a.id - b.id)
                                .map((item) => (
                                    <CarritoProfileCard
                                        key={item.id}
                                        id={item.id}
                                        name={item.jewell.name}
                                        image={item.jewell.url_image}
                                        price={item.jewell.price}
                                        quantity={item.quantity}
                                        onRemove={() => handleRemove(item.id)}
                                    />
                                ))}
                        </div>

                        {/* Resumen */}
                        <div className="col-4 products-card p-4">
                            <h4>Total</h4>
                            {discount > 0 && (
                                <p>
                                    Subtotal:{" "}
                                    {new Intl.NumberFormat("de-DE", {
                                        style: "currency",
                                        currency: "EUR",
                                    }).format(totalAmount)}
                                </p>
                            )}
                            <h5>{formattedTotal}</h5>

                            {/* Cupón */}
                            <div className="mt-3">
                                <button
                                    type="button"
                                    className="btn btn-link p-0 text-center"
                                    onClick={() => setShowCouponInput(!showCouponInput)}
                                >
                                    ¿Tienes un cupón?
                                </button>

                                {showCouponInput && (
                                    <div className="mt-2 bg-light border border-top p-3">
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder="Introduce tu cupón"
                                            value={coupon}
                                            onChange={(e) => setCoupon(e.target.value)}
                                        />
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={handleApplyCoupon}
                                        >
                                            Aplicar
                                        </button>
                                        {couponMessage && (
                                            <p className="mt-2 mb-0 small bg-warning-subtle">
                                                {couponMessage}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Botón de compra */}
                            <Link to="/payment">
                                <button
                                    type="button"
                                    className="btn btn-warning btn-warning-custom fs-5 mt-3 w-75 mx-auto d-block"
                                >
                                    Realizar compra
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};