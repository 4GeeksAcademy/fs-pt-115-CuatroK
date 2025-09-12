import React, { useRef } from 'react';
import VariableProximity from "../effects/VariableProximity";

export const Carrusel_principal = () => {
    const containerRef = useRef(null);

    return (
        <>
            <div className="container-fluid w-100" style={{ backgroundColor: 'brown' }}>
                <div className="container py-4">
                    <div className="row align-items-center g-4">
                        <div className="col-12 col-lg-4 text-white d-flex justify-content-center align-items-center">
                            <div ref={containerRef} style={{ position: 'relative' }}>
                                <h3 className="mb-0 text-center">
                                    <VariableProximity
                                        label="Sube la nota con 4K y deja que la luz haga"
                                        className="display-6"
                                        containerRef={containerRef}
                                        radius={140}
                                        falloff="linear"
                                        fromFontVariationSettings='"wght" 400, "opsz" 12'
                                        toFontVariationSettings='"wght" 900, "opsz" 36'
                                    />
                                </h3>
                                 <h3 className="mb-0 text-center">
                                    <VariableProximity
                                        label="su trabajo"
                                        className="display-6"
                                        containerRef={containerRef}
                                        radius={140}
                                        falloff="linear"
                                        fromFontVariationSettings='"wght" 400, "opsz" 12'
                                        toFontVariationSettings='"wght" 900, "opsz" 36'
                                    />
                                </h3>
                            </div>
                        </div>

                        <div className="col-12 col-lg-4">
                            <div id="myCarousel1" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#myCarousel1" data-bs-slide-to="0" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#myCarousel1" data-bs-slide-to="1" className="active" aria-current="true" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#myCarousel1" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>

                                <div className="carousel-inner rounded-3 overflow-hidden">
                                    <div className="carousel-item">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0057/6657/8279/files/blog_tiles.jpg?v=1709775420"
                                            className="d-block w-100"
                                            alt="Slide 1"
                                            style={{ height: '220px', objectFit: 'cover' }}
                                        />
                                    </div>

                                    <div className="carousel-item active">
                                        <img
                                            src="https://www.juvetti.com/cdn/shop/collections/14K_Gold_Jewellery_UK_45a347ef-dcaa-44a1-a9e6-92843fc73b98.jpg?v=1744057124&width=2048"
                                            className="d-block w-100"
                                            alt="Slide 2"
                                            style={{ height: '220px', objectFit: 'cover' }}
                                        />
                                    </div>

                                    <div className="carousel-item">
                                        <img
                                            src="https://i0.wp.com/roshanshahjewellers.com/wp-content/uploads/2024/06/il_fullxfull.2863886434_f4u2.jpg?resize=1024%2C684&ssl=1"
                                            className="d-block w-100"
                                            alt="Slide 3"
                                            style={{ height: '220px', objectFit: 'cover' }}
                                        />
                                    </div>
                                </div>

                                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel1" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel1" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>

                        <div className="col-12 col-lg-4">
                            <div id="myCarousel2" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#myCarousel2" data-bs-slide-to="0" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#myCarousel2" data-bs-slide-to="1" className="active" aria-current="true" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#myCarousel2" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>

                                <div className="carousel-inner rounded-3 overflow-hidden">
                                    <div className="carousel-item">
                                        <img
                                            src="https://cdn.alromaizan.com/image/upload/f_webp,q_100/media/blog/what-makes-a-jewellery-exhibition-a-unique-experience.webp"
                                            className="d-block w-100"
                                            alt="Slide 1"
                                            style={{ height: '220px', objectFit: 'cover' }}
                                        />
                                    </div>

                                    <div className="carousel-item active">
                                        <img
                                            src="https://www.joyeriairantzu.com/9573-ultralarge_default/cadena-riviere-de-diamantes-face-cube-recarlo.jpg"
                                            className="d-block w-100"
                                            alt="Slide 2"
                                            style={{ height: '220px', objectFit: 'cover' }}
                                        />
                                    </div>

                                    <div className="carousel-item">
                                        <img
                                            src="https://media.istockphoto.com/id/174955079/es/foto/cadenas-de-oro.jpg?s=612x612&w=0&k=20&c=NLOVGAatIHoag0_j7pArVEmIJWs4OmDKbrLW9Ng8BtA="
                                            className="d-block w-100"
                                            alt="Slide 3"
                                            style={{ height: '220px', objectFit: 'cover' }}
                                        />
                                    </div>
                                </div>

                                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel2" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel2" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};