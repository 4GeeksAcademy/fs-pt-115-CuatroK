import { Link } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { useAuth } from "../../hooks/useAuth";

export const ShoppingCart = () => {
    const { token } = useAuth()
    const url = import.meta.env.VITE_BACKEND_URL + "/api/shopping-cart";
    const { data } = useFetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    console.log(data)

    return (
        <div className="mt-2">

            <button
                className="btn btn-outline-dark"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#cartPanel"
                aria-controls="cartPanel"
                style={{ width: "50px", height: "50px" }}
            >
                <i className="fa-solid fa-cart-shopping text-warning"></i>
            </button>

            {/* Panel lateral del carrito */}
            <div
                className="offcanvas offcanvas-end"
                tabIndex="-1"
                id="cartPanel"
                aria-labelledby="cartPanelLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="cartPanelLabel">Tu carrito</h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Cerrar"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    {/* Aquí puedes renderizar productos dinámicos */}
                    <div className="mb-3">
                        <p>Producto 1 - €19.99</p>
                        <p>Producto 2 - €9.99</p>
                    </div>
                    <Link to="payment">
                        <button className="btn btn-warning w-100">Finalizar compra</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}