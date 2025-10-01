import { useEffect, useState } from "react"
import { getAllSales } from "../../../services/cartApi"
import { HistorialDePedidosCard } from "../../../components/admin/historialDePedidosComponents/HistorialDePedidosCard"

export const SalesList = () => {
    const [usersSales, setUsersSales] = useState()

    const getSales = async () => {
        const data = await getAllSales()
        setUsersSales(data)
    }

    useEffect(() => {
        getSales()
    }, [])

    return (
        <div className="vh-100">

            {
                !usersSales ? (
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

                    usersSales.length === 0 ? (
                        <h3 className="products-card text-center py-5 my-3 ">
                            Tu historial está vacío...
                        </h3>
                    ) : (

                        <div >
                            <h2 className="text-center my-3">Historial de pedidos</h2>
                            <div className="d-flex justify-content-center" >
                                <div className="products-card p-3 w-50" style={{
                                    backgroundColor: "#f5f0e6",
                                    padding: "30px",
                                    borderRadius: "12px",
                                    bordeRadius: "0.75rem",
                                    border: "1px solid #f1e0b3",
                                    maxWidth: "800px",
                                    margin: "auto",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                }}>
                                    {usersSales.map((item) => (
                                        <HistorialDePedidosCard
                                            key={item.id}
                                            id={item.id}
                                            total={item.total}
                                            quantity={item.items.reduce((acc, curr) => acc + curr.quantity, 0)}
                                            date={item.date}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                )}
        </div>
    )
}