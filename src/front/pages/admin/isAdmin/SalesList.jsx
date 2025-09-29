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
        <>

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
                            <div className="d-flex justify-content-center">
                                <div className="products-card p-3 w-50">
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
        </>
    )
}