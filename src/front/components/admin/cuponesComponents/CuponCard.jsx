import "../profile.css"

export const CuponCard = ({ discount_code, total, start_date, expiration_date }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="profile-card">
            <div className="card-body">
                <h3 className="card-title">Codigo:</h3>
                <div className="highlight">{discount_code}</div>

                <p className="info">
                    <strong>Descuento:</strong> {total}%
                </p>
                <p className="info">
                    <strong>Inicio:</strong> {formatDate(start_date)}
                </p>
                <p className="info expiration">
                    <strong>Vence:</strong> {formatDate(expiration_date)}
                </p>
            </div>
        </div>
    );
};