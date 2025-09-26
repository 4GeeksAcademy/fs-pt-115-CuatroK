export const CuponCard = ({ discount_code, total, start_date, expiration_date }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div
            className="card mb-3 border-0 shadow"
            style={{ backgroundColor: "#eed9c4" }} // productos-card color
        >
            <div className="card-body">
                {/* Código destacado */}
                <h3 className="text-center">Codigo:</h3>
                <div
                    className="text-center p-3 mb-3 rounded"
                    style={{
                        backgroundColor: "#d4af37",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        letterSpacing: "2px",
                    }}
                >
                    {discount_code}
                </div>

                {/* Info extra */}
                <p className="mb-1 text-center">
                    <strong>Descuento:</strong> {total}%
                </p>
                <p className="mb-1 text-center">
                    <strong>Inicio:</strong> {formatDate(start_date)}
                </p>
                <p className="mb-0 text-danger text-center">
                    <strong>Vence:</strong> {formatDate(expiration_date)}
                </p>
            </div>
        </div>
    );
};