
export default function LoadingSpinner() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-warning" role="status" style={{ width: "3rem", height: "3rem" }}>
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );
}