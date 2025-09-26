import { createContext, useContext, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { token } = useAuth();
    const [cartItems, setCartItems] = useState([]);

    const fetchCart = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/shopping-cart", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) {
                console.error("Error al cargar carrito:", res.status);
                setCartItems([]);
                return;
            }

            const data = await res.json();
            setCartItems(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error en fetchCart:", err);
            setCartItems([]);
        }
    };

    const addToCart = async (id) => {
        await fetch(import.meta.env.VITE_BACKEND_URL + "/api/shopping-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ jewell_id: id })
        });
        await fetchCart();
    };

    return (
        <CartContext.Provider value={{ cartItems, fetchCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);