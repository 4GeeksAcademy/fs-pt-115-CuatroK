import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import "../Catalogo/Style_Catalogo.css";
import { getJoyasSearch } from "../../../services/jewellsService";
import LoadingSpinner from "../../../components/public/LoadingSpinner";


function normalizeText(originalText) {
    return String(originalText || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

export function SearchResults() {
    const { busqueda } = useParams();
    const navigate = useNavigate();

    const decodedQuery = decodeURIComponent(busqueda || "");
    const normalizedTerm = normalizeText(decodedQuery);

    const [jewelryList, setJewelryList] = useState([]);
    const [loadStatus, setLoadStatus] = useState("loading");
    const [filteredJewelry, setFilteredJewelry] = useState([]);


    const openProduct = (productItem) => {
        const idOrSlug = productItem?.slug ? productItem.slug : String(productItem?.id ?? "");
        navigate(`/producto/${encodeURIComponent(idOrSlug)}`);
    };

    const formatPrice = (value) => {
        const num = Number(value);
        if (Number.isNaN(num)) return "—";
        return `${num.toFixed(2)} €`;
    };


    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                setLoadStatus("loading");
                const apiResponse = await getJoyasSearch();
                if (!isMounted) return;

                const normalizedList = Array.isArray(apiResponse)
                    ? apiResponse
                    : apiResponse?.items ?? [];

                setJewelryList(normalizedList);
                setLoadStatus("ok");
            } catch {
                if (!isMounted) return;
                setLoadStatus("error");
            }
        })();
        return () => { isMounted = false; };
    }, [busqueda]);


    useEffect(() => {
        if (!normalizedTerm) {
            setFilteredJewelry([]);
            return;
        }
        const matchesTerm = (j) => {
            const fields = [j?.name, j?.brand, j?.category, j?.gem, j?.metal, j?.description];
            for (const v of fields) if (normalizeText(v).includes(normalizedTerm)) return true;
            return false;
        };
        setFilteredJewelry((jewelryList || []).filter(matchesTerm));
    }, [jewelryList, normalizedTerm]);

    return (
        <div className="container py-4">

            <div className="d-flex align-items-center justify-content-between mb-3">
                <h1 className="mb-0">Catálogo: {decodedQuery}</h1>
            </div>


            {loadStatus === "loading" && <LoadingSpinner />}

            {loadStatus === "error" && (
                <div className="alert alert-danger">No se pudieron cargar los resultados.</div>
            )}

            {loadStatus === "ok" && filteredJewelry.length === 0 && (
                <div className="alert alert-warning">
                    No hay productos que coincidan con “{decodedQuery}”.{" "}
                    <Link to="/catalogo/anillos">Ver catálogo</Link>
                </div>
            )}


            {loadStatus === "ok" && filteredJewelry.length > 0 && (
                <div className="row g-3">
                    {filteredJewelry.map((productItem) => (
                        <div
                            className="col-12 col-sm-6 col-md-4 col-lg-3"
                            key={productItem?.id ?? `${productItem?.slug ?? "no-id"}`}
                        >
                            <div
                                className="card h-100 position-relative"
                                role="button"
                                tabIndex={0}
                                style={{ cursor: "pointer" }}
                                onClick={() => openProduct(productItem)}
                                onKeyDown={(ev) => ev.key === "Enter" && openProduct(productItem)}
                            >
                                <img
                                    src={productItem?.url_image}
                                    alt={productItem?.name || "Producto"}
                                    className="card-img-top"
                                    style={{ objectFit: "cover", height: 200 }}
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://via.placeholder.com/600x400?text=Sin+imagen";
                                    }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{productItem?.name || "Sin nombre"}</h5>
                                    <p className="card-text small text-muted mb-2">
                                        {productItem?.description || "Sin descripción."}
                                    </p>
                                    <div className="mt-auto">
                                        <div className="fw-bold">{formatPrice(productItem?.price)}</div>
                                        <button
                                            className="btn btn-primary w-100 mt-2"
                                            onClick={(ev) => {
                                                ev.stopPropagation();
                                                console.log("[SearchResults] Añadir al carrito:", productItem?.id);
                                            }}
                                        >
                                            Añadir
                                        </button>
                                    </div>
                                </div>

                                {productItem?.highlighted && (
                                    <span
                                        className="badge text-bg-warning"
                                        style={{ position: "absolute", top: 8, right: 8 }}
                                    >
                                        Destacado
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
