import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetCartProducts, removeCartItem } from "../../services/cartApi";
import CarritoProfileCard from "../admin/carritoComponents/CarritoProfileCard";
import { useAuth } from "../../hooks/useAuth"
import { useFetch} from "../../hooks/useFetch"

export const ShoppingCart = () => {
        const [cartItems, setCartItems] = useState([]);
        const { token, finalAmount } = useAuth()
        const url = import.meta.env.VITE_BACKEND_URL + "/api/shopping-cart"
        const { data, fetchData, loading } = useFetch(url, {
                method: "GET",
                headers: {
                        Authorization: `Bearer ${token}`,
                },
     
        })
       console.log(data);
       
        useEffect(() => {
                const offcanvasEl = document.getElementById("cartPanel");
                if (!offcanvasEl) return;

                const handleHidden = () => {
                        document.querySelectorAll(".offcanvas-backdrop").forEach((el) => el.remove());
                        document.body.classList.remove("offcanvas-backdrop");
                };

                offcanvasEl.addEventListener("hidden.bs.offcanvas", handleHidden);
                return () => {
                        offcanvasEl.removeEventListener("hidden.bs.offcanvas", handleHidden);
                };
        }, []);

        useEffect(() => {
                if (data) {
                        setCartItems(data)
                }
          
                
        }, [data]);

        const totalAmount = cartItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
        );
        const handleRemove = async (id) => {
        await removeCartItem(id)
        await fetchData()
    }

        return (
                <div className="mt-2">
                        <button
                                className="btn btn-outline-dark"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#cartPanel"
                                aria-controls="cartPanel"
                                style={{ width: "50px", height: "50px" }}
                        >
                                <i className="fa-solid fa-cart-shopping text-warning"></i>
                        </button>

                        <div
                                className="offcanvas offcanvas-end"
                                tabIndex="-1"
                                id="cartPanel"
                                aria-labelledby="cartPanelLabel"
                        >
                                <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="cartPanelLabel">Tu carrito</h5>
                                        <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="offcanvas"
                                                aria-label="Cerrar"
                                        ></button>
                                </div>

                                <div className="offcanvas-body">
                                        {cartItems.length === 0 ? (
                                                <p>Tu carrito está vacío.</p>
                                        ) : (
                                                <div className="mb-3">
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
                                        )}
                                        <p className="fw-bold text-end">Total: {finalAmount.toFixed(2)} €</p>

                                        <Link to="payment">
                                                <button className="btn btn-warning w-100">Finalizar compra</button>
                                        </Link>
                                </div>
                        </div>
                </div>
        );
};