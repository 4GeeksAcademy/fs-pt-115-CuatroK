import React from 'react';

export const Carrusel_principal = () => {
    return (
        <>
            {/* //div del carrusel */}
            <style>{`
        @media (min-width: 992px) {
          .col-lg-30 { flex: 0 0 30%; max-width: 30%; }
          .col-lg-35 { flex: 0 0 35%; max-width: 35%; }
        }
      `}</style>
            <div className="container-fluid w-100" style={{ backgroundColor: 'red' }}>
                {/* //DIV DEL FONDO DEL CARRUSEL */}
                <div className="container py-4">
                    <div className="row align-items-center g-4">

                        {/* // DIV DEL LADO IZQUIERDO CON EL LEMA DEL CARRUSEL  */}
                        <div className="col-12 col-lg-30 text-white">
                            <h1 className="display-5 fw-bold"></h1>
                            <p className="lead mb-0">Sube la nota con 4K y deja que la luz haga su trabajo</p>
                        </div>

                        {/* //div del carrusel */}
                        <div className="col-12 col-lg-35">
                            <div id="myCarousel1" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#myCarousel1" data-bs-slide-to="0" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#myCarousel1" data-bs-slide-to="1" className="active" aria-current="true" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#myCarousel1" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>

                                <div className="carousel-inner rounded-3 overflow-hidden">
                                    <div className="carousel-item">
                                        <img
                                            src="https://joyeriafinarte.com/wp-content/uploads/2023/11/Compra-y-Venta-Oro-Joyas-Madrid-Finarte.jpg"
                                            className="d-block w-100"
                                            alt="Slide 1"
                                            style={{ height: '220px', objectFit: 'cover' }}
                                        />
                                    </div>

                                    <div className="carousel-item active">
                                        <img
                                            src="https://i.ytimg.com/vi/qMbpSGzEE98/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-HYAC8BCKAgwIABABGEogSChlMA8=&rs=AOn4CLDL8jR23utYw9u_WLBexEUYTEAMgg"
                                            className="d-block w-100"
                                            alt="Slide 2"
                                            style={{ height: '220px', objectFit: 'cover' }}
                                        />
                                    </div>

                                    <div className="carousel-item">
                                        <img
                                            src="https://s3.abcstatics.com/Media/201301/09/jo-yas-oro--478x270.jpg"
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

                        <div className="col-12 col-lg-35">
                            <div id="myCarousel2" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#myCarousel2" data-bs-slide-to="0" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#myCarousel2" data-bs-slide-to="1" className="active" aria-current="true" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#myCarousel2" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>

                                <div className="carousel-inner rounded-3 overflow-hidden">
                                    <div className="carousel-item">
                                        <img
                                            src="https://s3.abcstatics.com/Media/201301/09/jo-yas-oro--478x270.jpg"
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