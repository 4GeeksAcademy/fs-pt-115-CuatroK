import { Link } from "react-router-dom";

export const AdminHome = () => {


    const Divider = () => (
        <div
            style={{
                width: "1px",
                height: "150px",
                backgroundColor: "#424242ff",
                alignSelf: "center",
            }}
        />
    );


    return (
        <div className="d-flex justify-content-center align-items-center vh-100 ">
            <div className="d-flex gap-5 text-center align-items-center border border-dark p-5">

                <Link to={"/post-product"} className="text-reset text-decoration-none">
                    <div style={{ cursor: "pointer" }}>
                        <div className="fw-bold mb-2 fa-2x mb-4">Crear Producto</div>
                        <i className="fas fa-plus fa-5x "></i>
                    </div>
                </Link>

                <Divider />
                <Link to={"/user-list"} className="text-reset text-decoration-none">
                    <div style={{ cursor: "pointer" }}>
                        <div className="fw-bold mb-2 fa-2x mb-4">Lista de Usuarios</div>
                        <i className="fas fa-users fa-5x"></i>
                    </div>
                </Link>

                <Divider />
                <Link to={"/sales-list"} className="text-reset text-decoration-none">
                    <div style={{ cursor: "pointer" }}>
                        <div className="fw-bold mb-2 fa-2x mb-4">Lista de Ventas</div>
                        <i className="fas fa-shopping-cart fa-5x"></i>
                    </div>
                </Link>

                <Divider />
                <Link to={"/product-list"} className="text-reset text-decoration-none">
                    <div style={{ cursor: "pointer" }}>
                        <div className="fw-bold mb-2 fa-2x mb-4">Lista de Productos</div>
                        <i className="fas fa-box fa-5x"></i>
                    </div>
                </Link>

            </div>
        </div>
    );
};
