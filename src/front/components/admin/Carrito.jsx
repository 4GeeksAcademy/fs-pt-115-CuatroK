import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useFetch } from "../../hooks/useFetch";
import "../../index.css"
import CarritoProfileCard from "./carritoComponents/CarritoProfileCard"
import { removeCartItem } from "../../services/cartApi";
import { getDiscount, getJoyasSearch } from "../../services/serviceApi";
import LoadingSpinner from "../public/LoadingSpinner";
import { Link } from "react-router-dom";


export const Carrito = () => {
    const { token, setDiscount, discount, setFinalAmount, finalAmount } = useAuth()
    const url = import.meta.env.VITE_BACKEND_URL + "/api/shopping-cart"
    const { data, fetchData, loading } = useFetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    console.log(data)
    const [cartItems, setCartItems] = useState([])

    const [showCouponInput, setShowCouponInput] = useState(false)
    const [coupon, setCoupon] = useState("")
    const [totalAmount, setTotalAmount] = useState(null)
    const [couponMessage, setCouponMessage] = useState("")

    useEffect(() => {
        if (data) {
            setCartItems(data)
        }
    }, [data])

    useEffect(() => {
        if (data) {
            const total = data.reduce(
                (acc, item) => acc + item.jewell.price * item.quantity,
                0
            )
            setDiscount(null)
            setTotalAmount(total)
            setFinalAmount(total)
        }

    }, [data])


    const handleRemove = async (id) => {
        await removeCartItem(id)
        await fetchData()
    }

    const getDiscountData = async () => {
        const data = await getDiscount(token)
        console.log(data)
        return data
    }

    const handleApplyCoupon = async () => {
        const data = await getDiscountData();
        const discountData = data.find(d => d.discount_code === coupon);

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
    }

    const formattedTotal = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(finalAmount || totalAmount);

    console.log(finalAmount)

    return (
        <div>
            <h2>Carritos</h2>
            {loading || !data ? (
                <div className="d-flex justify-content-center align-items-center w-100 h-100">
                    <div
                        className="spinner-border text-warning"
                        role="status"
                        style={{ width: "2rem", height: "2rem" }}
                    >
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : data.length <= 0 ? (
                <h3 className="products-card text-center py-5 my-3">
                    Tu carrito está vacio...
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
                                        fetchData={fetchData}
                                    />
                                ))}
                        </div>
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
                                            <p className="mt-2 mb-0 small bg-warning-subtle">{couponMessage}</p>
                                        )}
                                    </div>
                                )}
                            </div>

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
    )
}