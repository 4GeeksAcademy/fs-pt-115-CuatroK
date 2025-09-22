import { useAuth } from "../../hooks/useAuth";
import { useFetch } from "../../hooks/useFetch"
import { HistorialDePedidosCard } from "./historialDePedidosComponents/HistorialDePedidosCard"

const url = import.meta.env.VITE_BACKEND_URL + "/api";
export const HistorialDePedidos = () => {
    const { token } = useAuth()
    const { data, loading } = useFetch(`${url}/sale/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    return (
        <>
            <h2>Historial</h2>
            {
                loading || !data ? (
                    (<div className="d-flex justify-content-center align-items-center w-100 h-100">
                        <div
                            className="spinner-border text-warning"
                            role="status"
                            style={{ width: "2rem", height: "2rem" }}
                        >
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>)
                ) :
                    <div >
                        <div >
                            <div className=" bg-success p-3">
                                {
                                    data.map((item) => (
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
            }
        </>
    )
}