import { useState } from "react";

export const Buscador = () => {

    const [showSearch, setShowSearch] = useState(false);

    return (

        <div>

            <div
                className="search-trigger"
                onMouseEnter={() => setShowSearch(true)}
                onMouseLeave={() => setShowSearch(false)}
            >
                <i className="fa-sharp fa-solid fa-magnifying-glass text-warning"></i>
                <input
                    type="text"
                    className={`form-control search-bar ${showSearch ? "visible" : ""}`}
                    placeholder="Buscar..."
                />
            </div>
        </div>
    )
}