import { useAuth } from "../../hooks/useAuth";
import { HistorialDePedidosCard } from "./historialDePedidosComponents/HistorialDePedidosCard"
import "../../index.css"
import { useEffect, useState } from "react";
import { getHistory } from "../../services/serviceApi";

export const HistorialDePedidos = () => {
    const { token } = useAuth()
    const [historyData, setHistoryData] = useState()

    const getSalesHistory = async () => {
        const data = await getHistory(token)
        setHistoryData(data)
    }

    useEffect(() => {
        getSalesHistory()
    }, [])

    return (
        <>
            <h2>Historial</h2>
            {
                !historyData ? (
                    (<div className="d-flex justify-content-center align-items-center w-100 h-100">
                        <div
                            className="spinner-border text-warning"
                            role="status"
                            style={{ width: "2rem", height: "2rem" }}
                        >
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>)
                ) : (
                    historyData.length === 0 ? (
                        <h3 className="products-card text-center py-5 my-3">
                            Tu historial está vacío...
                        </h3>
                    ) : (
                        <div >
                            <div >
                                <div className="products-card  p-3">
                                    {
                                        historyData.map((item) => (
                                            <HistorialDePedidosCard
                                                id={item.id}
                                                total={item.total}
                                                quantity={item.items.reduce((acc, curr) => acc + curr.quantity, 0)}
                                                date={item.date}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )
                )}
        </>
    )
}