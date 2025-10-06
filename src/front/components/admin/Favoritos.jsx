import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFavorite, getFavorite, removeFavorite } from "../../services/serviceApi";
import { useAuth } from "../../hooks/useAuth";
import { ProductCard } from "./favoritosComponents/ProductCard";
import "./profile.css"

export const Favoritos = () => {
    const navigate = useNavigate()
    const { token } = useAuth()
    const [favorites, setFavorites] = useState([])

    const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
    const passHighlight = (item) => !!item.highlighted;

    const getFavoritesAsync = async () => {
        const data = await getFavorite(token)
        setFavorites(data)
    }

    const abrirProducto = (p) => {
        const idOSlug = p?.slug ? p.slug : String(p?.id ?? "");
        navigate(`/producto/${encodeURIComponent(idOSlug)}`);
    };

    const añadirFavoritos = async (id) => {
        try {
            if (favorites.some(f => f.id === id)) {
                // Si ya es favorito, lo removemos
                await removeFavorite(token, id);
            } else {
                // Si no es favorito, lo agregamos
                await addFavorite(token, id);
            }
            // Luego recargamos la lista de favoritos
            const data = await getFavorite(token);
            setFavorites(data);
        } catch (error) {
            console.error("Error al actualizar favorito:", error);
        }
    };

    useEffect(() => {
        getFavoritesAsync()
    }, [])
    console.log(favorites)
    return (
        <div>
            {
                favorites.length === 0 ? (
                    <h3 className="profile-card text-center py-5 my-3">
                        No tienes productos favoritos...
                    </h3>
                ) : (
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        {favorites.map((item) => (
                            <ProductCard
                                key={item.id}
                                item={item}
                                favoritos={new Set(favorites.map(f => f.id))}
                                abrirProducto={abrirProducto}
                                añadirFavoritos={añadirFavoritos}
                                passHighlight={passHighlight}
                                euro={euro}
                            />
                        ))
                        }
                    </div>
                )}
        </div >
    )
}