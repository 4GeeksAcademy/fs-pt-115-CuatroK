import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useFetch } from "../../hooks/useFetch";
import "../../index.css"
import CarritoProfileCard from "./carritoComponents/CarritoProfileCard"

export const Carrito = () => {
    const { token } = useAuth()
    const url = import.meta.env.VITE_BACKEND_URL + "/api/shopping-cart";
    const { data, fetchData } = useFetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    const [totalAmount, setTotalAmount] = useState(null)
    const getTotalProducts = (total) => {
        setTotalAmount(prev => prev + total)
    }



    return (
        <div>
            <h2>Carritos</h2>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-7  me-5 mb-5 products-card p-4">
                        {
                            data &&
                            data.map((item) => (
                                <CarritoProfileCard
                                    key={item.id}
                                    id={item.id}
                                    name={item.jewell.name}
                                    image={item.jewell.url_image}
                                    price={item.jewell.price}
                                    quantity={item.quantity}
                                    onRemove={() => handleRemove(item.id)}
                                    fetchData={fetchData}
                                    getTotalProducts={getTotalProducts}
                                />
                            ))
                        }
                    </div>
                    <div className="col-4  products-card p-4">
                        <h4>Total</h4>
                        <h5>{totalAmount / 2}</h5>
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