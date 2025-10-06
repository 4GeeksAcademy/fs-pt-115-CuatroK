import "../../components/admin/profile.css"

export const PaymentSuccessfull = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: "#f9f5f0" }}
        >
            <div
                className="card text-center p-5"
                style={{
                    backgroundColor: "#f5f0e6",
                    border: "1px solid #f1e0b3",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "0.75rem",
                    maxWidth: "500px",
                }}
            >
                <div className="mb-4">
                    <i
                        className="bi bi-check-circle-fill"
                        style={{ color: "#36aa1eff", fontSize: "4rem" }}
                    ></i>
                </div>
                <h1 style={{ color: "#c2a15d" }}>¡Pago procesado con éxito!</h1>
                <p className="mt-3 mb-4" style={{ color: "#4a4a4a" }}>
                    Tu transacción se ha completado correctamente.
                </p>
                <a href="/" className="btn btn-warning px-4 py-2">
                    Volver al inicio
                </a>
            </div>
        </div>
    );
};