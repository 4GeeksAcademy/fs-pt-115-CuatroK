export const ProductCard = ({ item, favoritos, abrirProducto, añadirFavoritos, passHighlight, euro }) => {
    const isFav = favoritos.has(item.id);

    const handleCardClick = () => abrirProducto(item);

    const handleLikeClick = (e) => {
        e.stopPropagation(); // Evita que se dispare abrirProducto
        añadirFavoritos(item.id);
    };

    return (
        <div
            className="card h-100 position-relative"
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer", width: "18rem" }}
            onClick={handleCardClick}
            onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
        >
            <img
                src={item.url_image}
                alt={item.name || "Producto"}
                className="card-img-top"
                style={{ objectFit: "cover", height: 200 }}
                loading="lazy"
            />

            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name || "Sin nombre"}</h5>
                <p className="card-text small text-muted mb-2">
                    {item.description || "Sin descripción."}
                </p>
                <div className="mt-auto">
                    <div className="fw-bold">{euro.format(item.price)}</div>
                </div>
            </div>

            {passHighlight(item) && (
                <span className="badge text-bg-warning top-right">Destacado</span>
            )}

            <button
                className="btn-like"
                onClick={handleLikeClick}
                aria-pressed={isFav}
                aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
            >
                <i
                    className={isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                    style={{ color: isFav ? "#e0182d" : "#9aa1ac", fontSize: 18 }}
                />
            </button>
        </div>
    );
};
