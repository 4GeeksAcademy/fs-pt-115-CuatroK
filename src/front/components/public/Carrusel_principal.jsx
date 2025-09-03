import React from 'react';

export const Carrusel_principal = () => {
    return (

        
        <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#myCarousel"
                    data-bs-slide-to="0"
                    aria-label="Slide 1"
                ></button>
                <button
                    type="button"
                    data-bs-target="#myCarousel"
                    data-bs-slide-to="1"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 2"
                ></button>
                <button
                    type="button"
                    data-bs-target="#myCarousel"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                ></button>
            </div>

            <div className="carousel-inner">
                <div className="carousel-item">
                    <img
                        src="https://joyeriafinarte.com/wp-content/uploads/2023/11/Compra-y-Venta-Oro-Joyas-Madrid-Finarte.jpg"
                        className="d-block w-100"
                        alt="Slide 1"
                        style={{ height: '500px', objectFit: 'cover' }}
                    />
                </div>

                <div className="carousel-item active">
                    <img
                        src="https://static.abc.es/media/estilo/2021/05/07/apertura-joyas-small-ku5B--1024x512@abc.jpg"
                        className="d-block w-100"
                        alt="Slide 2"
                        style={{ height: '500px', objectFit: 'cover' }}
                    />
                </div>

                <div className="carousel-item">
                    <img
                        src="https://s3.abcstatics.com/Media/201301/09/jo-yas-oro--478x270.jpg"
                        className="d-block w-100"
                        alt="Slide 3"
                        style={{ height: '500px', objectFit: 'cover' }}
                    />
                </div>
            </div>

            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#myCarousel"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>

            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#myCarousel"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};