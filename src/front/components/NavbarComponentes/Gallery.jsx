export const Gallery = () => {
    const carousels = [
        {
            id: "carouselOne",
            images: [
                "https://i.pinimg.com/736x/36/51/37/3651378bbc6693a4dcfba800384bde9f.jpg",
                "https://i.pinimg.com/736x/ae/2a/a3/ae2aa3b27e4190db620a5f79dd5e8f1a.jpg"
            ]
        },
        {
            id: "carouselTwo",
            images: [
                "https://i.pinimg.com/1200x/64/88/b3/6488b32dd4e13ed2eb374488b41542ec.jpg",
                "https://i.pinimg.com/1200x/73/8a/27/738a275055ca889d3a02763850df0061.jpg"
            ]
        },
        {
            id: "carouselThree",
            images: [
                "https://i.pinimg.com/736x/ac/2c/61/ac2c61affef693d5056b8a3c44852551.jpg",
                "https://i.pinimg.com/1200x/81/44/dd/8144dd5e47e63f1be309e27fe3e44807.jpg"
            ]
        },
        {
            id: "carouselFour",
            images: [
                "https://i.pinimg.com/1200x/f7/0e/8f/f70e8f62de8c4843a1469e480b78bc32.jpg",
                "https://i.pinimg.com/1200x/66/b4/eb/66b4eb7b5d63c74c8e8e5eebebd62d99.jpg"
            ]
        },
        {
            id: "carouselFive",
            images: [
                "https://i.pinimg.com/1200x/af/3b/2f/af3b2ff67545f66c4d2da37023f8d968.jpg",
                "https://i.pinimg.com/1200x/77/71/39/77713907fdcd6d6321c044314597e6a5.jpg"
            ]
        },
        {
            id: "carouselSix",
            images: [
                "https://i.pinimg.com/1200x/14/80/3e/14803e82846d15ad1e3e1c1ecd8f47de.jpg",
                "https://i.pinimg.com/1200x/c5/d6/e4/c5d6e4eb847bdc998eb48feb60e16822.jpg"
            ]
        }
    ];



    return (
        <div className="container-fluid page-background-color py-5">
            {/* Encabezado */}
            <div className="row mb-5">
                <div className="col-lg-8 mx-auto text-center text-light">
                    <img
                        src="https://i.pinimg.com/736x/87/66/02/876602ad3dd4a0b612d5086c4daf2a7f.jpg"
                        alt="El alfa"
                        className="img-fluid rounded shadow mb-4"
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                    />
                    <h1 className="display-5 fw-light fst-italic text-dark">Destellos con historia</h1>
                    <p className="lead text-dark">El oro y las gemas cuentan historias infinitas sobre la piel.</p>
                </div>
            </div>

            {/* Carruseles individuales */}
            <div className="row g-4">
                {carousels.map((carousel) => (
                    <div className="col-md-6 col-lg-4" key={carousel.id}>
                        <div id={carousel.id} className="carousel slide shadow rounded overflow-hidden">
                            <div className="carousel-inner">
                                {carousel.images.map((img, i) => (
                                    <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                                        <img
                                            src={img}
                                            className="d-block w-100"
                                            alt={`Slide ${i + 1}`}
                                            style={{ height: "300px", objectFit: "cover" }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target={`#${carousel.id}`}
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Anterior</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target={`#${carousel.id}`}
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Siguiente</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Carrusel general */}
            <div className="row mt-5">
                <div className="col-lg-10 mx-auto">
                    <div id="carouselExample" className="carousel slide shadow rounded overflow-hidden">
                        <div className="carousel-inner">
                            {[
                                "https://i.pinimg.com/1200x/68/59/49/685949c94bbc543360a4deb56c4c5638.jpg",
                                "https://i.pinimg.com/1200x/75/c8/c3/75c8c3223c8ac911787dcc926ec1dafc.jpg",
                                "https://i.pinimg.com/1200x/be/a8/73/bea8733ad786e088e9f16bae693612e7.jpg",
                            ].map((img, i) => (
                                <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                                    <img
                                        src={img}
                                        className="d-block w-100"
                                        alt={`Slide ${i + 1}`}
                                        style={{ height: "400px", objectFit: "cover" }}
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExample"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Anterior</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExample"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Siguiente</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};