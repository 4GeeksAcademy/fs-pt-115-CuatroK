import { useNavigate } from 'react-router-dom';

export const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="card mb-3 row"
        style={{
          backgroundImage: "url('https://i.pinimg.com/1200x/44/ed/4c/44ed4cc167dd353c68002ceb10b89270.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#f5ececff',
          padding: '20px',
          borderRadius: '12px',
        }}
      >
        <div className="col-md-12 text-start mb-3">
          <button
            className="btn btn-link border-0 w-25 h-50 text-light"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-circle-arrow-left fa-3x"></i>
          </button>
        </div>

        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // semitransparente para que se vea el fondo
            borderRadius: '12px',
            padding: '20px',
          }}
          className='d-flex justify-content-center align-items-center'
        >
          <img
            src="/logo4k.png"
            className="card-img-top mb-3 "
            alt="CuatroK"
            style={{ width: "500px", height: "500px", borderRadius: '8px', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          />
          <div className="card-body">
            <h5 className="card-title">Bienvenido al universo del brillo y la elegancia.</h5>
            <p className="card-text">Nuestra página es un escaparate digital donde cada joya cuenta una historia. Desde anillos que simbolizan eternidad hasta collares que capturan la luz con cada movimiento, ofrecemos piezas únicas diseñadas para resaltar tu estilo y celebrar tus momentos más especiales.</p>
            <h5>Diseño exclusivo</h5>
            <p>Cada colección está cuidadosamente elaborada por artesanos que combinan tradición y vanguardia, utilizando materiales de alta calidad como oro, plata, piedras preciosas y gemas naturales.</p>
            <h5>Para cada ocasión</h5>
            <p>Ya sea un regalo, una celebración o simplemente un capricho, aquí encontrarás la joya perfecta para expresar lo que las palabras no pueden decir.</p>
            <h5>Compra segura y personalizada</h5>
            <p>Explora, elige y compra con total confianza. Nuestro equipo está listo para asesorarte y ayudarte a encontrar esa pieza que te hará brillar.</p>
            <p className="card-text"><small className="text-light">Última actualización hace 3 minutos</small></p>
          </div>
        </div>
      </div>
    </div>
  );
};