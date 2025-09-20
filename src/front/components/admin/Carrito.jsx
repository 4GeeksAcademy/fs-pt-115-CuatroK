import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useFetch } from "../../hooks/useFetch";
import "../../index.css"
import CarritoProfileCard from "./carritoComponents/CarritoProfileCard"
import { removeCartItem } from "../../services/cartApi";
import { getJoyasSearch } from "../../services/serviceApi";

export const Carrito = () => {
    const { token } = useAuth()
    const url = import.meta.env.VITE_BACKEND_URL + "/api/shopping-cart";
    const { data, fetchData } = useFetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    const [totalAmount, setTotalAmount] = useState(0)
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        if (data) {
            setCartItems(data)
        }
        const getjoyas = async () => {
            const data = await getJoyasSearch()
            console.log(data)
        }
        getjoyas()
    }, [data])

    useEffect(() => {
        if (data) {
            const total = data.reduce(
                (acc, item) => acc + item.jewell.price * item.quantity,
                0
            )
            setTotalAmount(total)
        }
    }, [data])



    const handleRemove = async (id) => {
        await removeCartItem(id)
        await fetchData()
    }

    const formattedTotal = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(totalAmount)

    return (
        <div>
            <h2>Carritos</h2>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-7 me-5 mb-5 products-card p-4">
                        {[...cartItems].sort((a, b) => a.id - b.id).map((item) => (
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
                        <h5>{formattedTotal}</h5>
                        <button
                            type="button"
                            className="btn btn-warning btn-warning-custom fs-5 mt-3 w-75 mx-auto d-block"
                        >
                            Realizar compra
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}