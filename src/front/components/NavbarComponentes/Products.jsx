import { useState } from "react";
import "./ProductsStyles.css";
import { Link } from "react-router-dom";

export const Products = () => { 

    const categories = [
        { name: "Relojes", img: "https://i.pinimg.com/1200x/27/e8/21/27e8213686298acdd9789bce0f94db50.jpg" },
        { name: "Collar", img: "https://i.pinimg.com/736x/66/5a/17/665a17c38b8342fc3c075c9425e7b621.jpg" },
        { name: "Pulseras", img: "https://i.pinimg.com/1200x/55/cc/37/55cc3763491e0303be2405065e4269ca.jpg" },
        { name: "Pendientes", img: "https://i.pinimg.com/1200x/8a/2a/53/8a2a530437325cac25bcd326ceb58c2b.jpg" },
        { name: "Tobilleras", img: "https://i.pinimg.com/736x/04/29/88/042988b4462a5a957f748684e08eac38.jpg" },
    ];


    const [hovered, setHovered] = useState(null);
 
    return (
        <div className="row" style={{ width: "100vw", margin: 0, padding: 0}}>

            <div className="d-flex justify-content-center align-items-center flex-nowrap overflow-auto gap-3 p-3 page-background-color">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        className="category-button"
                        onMouseEnter={() => setHovered(index)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        {hovered === index ? (
                            <img src={cat.img} alt={cat.name} className="category-image" /> 
                        ) : (
                            <span>{cat.name}</span> 
                        )}
                    </div>

                ))}
                <Link to="calculadora">
                <button className="btn btn-warning mb-3 color-buttons category-button mt-3"
                style={{borderRadius: "12px"}}
                >Calculadora de Metales
                </button>
                </Link>
            </div>

        </div>
    );
};
