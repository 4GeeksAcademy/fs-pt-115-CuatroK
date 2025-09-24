import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { useAuth } from "../../../hooks/useAuth";
import { CategoryCard } from "../../public/CategoryCard";
import LoadingSpinner from "../../public/LoadingSpinner";
import { useParams } from "react-router-dom";
import "./historialDePedidos.css"


const url = import.meta.env.VITE_BACKEND_URL + "/api";
export const PedidoDetail = () => {
    const { token } = useAuth()
    const { id } = useParams();

    const { data, loading } = useFetch(`${url}/sale/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    if (loading || !data) {
        return <LoadingSpinner />
    }

    const pedido = data.find((p) => p.id === parseInt(id));
    console.log(pedido.items)

    const fecha = new Date(pedido.date).toLocaleString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const totalAmount = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(pedido.total)


    return (
        <div className="pedido-detail">
            <header className="pedido-header">
                <h1>Detalles del pedido</h1>
                <p className="pedido-date"> {fecha}</p>
                <p className="pedido-total">
                    Total: {totalAmount}
                </p>
            </header>

            <section className="pedido-items">
                <h2>Artículos comprados</h2>
                <div className="pedido-items-grid">
                    {pedido.items.map((item) => (
                        <div className="pedido-item-card" key={item.id}>
                            <img
                                src={item.jewell.url_image}
                                alt={item.jewell.name}
                                className="pedido-item-image"
                            />
                            <div className="pedido-item-info">
                                <h3>{item.jewell.name}</h3>
                                <p className="pedido-item-brand">{item.jewell.brand}</p>
                                <p>
                                    Precio:{" "}
                                    {new Intl.NumberFormat("es-ES", {
                                        style: "currency",
                                        currency: "EUR",
                                    }).format(item.jewell.price)}
                                </p>
                                <p>Cantidad: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};