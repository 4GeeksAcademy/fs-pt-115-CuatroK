import { useEffect } from "react";
import { Link } from "react-router-dom";
import { removeCartItem } from "../../services/cartApi";
import CarritoProfileCard from "../admin/carritoComponents/CarritoProfileCard";
import { useCart } from "../../hooks/useFetch";
import { useAuth } from "../../hooks/useAuth";

export const ShoppingCart = () => {
  const { cartItems, fetchCart } = useCart();
  const { finalAmount, setFinalAmount, token } = useAuth();

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce(
        (acc, item) => acc + item.jewell.price * item.quantity,
        0
      );
      setFinalAmount(total);
    } else {
      setFinalAmount(0);
    }
  }, [cartItems, setFinalAmount]);

  const handleRemove = async (id) => {
    await removeCartItem(id);
    await fetchCart();
  };

        return (
                <div className="mt-2">
                        <button
                                className="btn btn-outline-dark border-light"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#cartPanel"
                                aria-controls="cartPanel"
                                style={{ width: "50px", height: "50px" }}
                        >
                                <i className="fa-solid fa-cart-shopping text-light"></i>
                        </button>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="cartPanel"
        aria-labelledby="cartPanelLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="cartPanelLabel">
            Tu carrito
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Cerrar"
          ></button>
        </div>

        <div className="offcanvas-body">
          {!cartItems || cartItems.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <div className="mb-3">
              {cartItems
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
          )}

          <p className="fw-bold text-end">
            Total: {finalAmount ? finalAmount.toFixed(2) : "0.00"} €
          </p>

          <Link to="/user">
            <button className="btn btn-warning w-100">Finalizar compra</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
