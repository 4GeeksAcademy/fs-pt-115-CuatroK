import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { CategoryCard } from "../../public/CategoryCard";
import LoadingSpinner from "../../public/LoadingSpinner";
import { useParams } from "react-router-dom";
import "./historialDePedidos.css"
import { getHistory } from "../../../services/serviceApi";
import "../profile.css"

export const PedidoDetail = () => {
    const { id } = useParams();
    const { token } = useAuth()
    const [historyData, setHistoryData] = useState()

    const getSalesHistory = async () => {
        const data = await getHistory(token)
        setHistoryData(data)
    }

    useEffect(() => {
        getSalesHistory()
    }, [])

    if (!historyData) {
        return <LoadingSpinner />
    }

    const pedido = historyData.find((p) => p.id === parseInt(id));

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
        <div className="profile-card pedido-detail">
            <div className="card-body">

                {/* Encabezado del pedido */}
                <header className="text-center mb-4">
                    <h1 className="pedido-header">Detalles del pedido</h1>
                    <p className="info">{fecha}</p>
                    <p className="highlight">Total: {totalAmount}</p>
                </header>

                {/* Lista de artículos */}
                <section className="pedido-items">
                    <h2 className="card-title">Artículos comprados</h2>

                    <div className="pedido-items-grid mt-3">
                        {pedido.items.map((item) => (
                            <div className="profile-form pedido-item-card" key={item.id}>
                                <img
                                    src={item.jewell.url_image}
                                    alt={item.jewell.name}
                                    className="pedido-item-image mb-3"
                                    style={{ borderRadius: "0.5rem", maxHeight: "150px", objectFit: "cover" }}
                                />

                                <div className="pedido-item-info text-center">
                                    <h3 className="info ">{item.jewell.name}</h3>
                                    <p className="info text-start">{item.jewell.brand}</p>
                                    <p className="info text-start">
                                        Precio:{" "}
                                        {new Intl.NumberFormat("es-ES", {
                                            style: "currency",
                                            currency: "EUR",
                                        }).format(item.jewell.price)}
                                    </p>
                                    <p className="info text-start">Cantidad: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};