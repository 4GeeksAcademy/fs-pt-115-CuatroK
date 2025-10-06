
export const ContactPhone = () => {
  return (
    <div>

      <div style={{
        backgroundColor: '#f8f4f0',
        borderRadius: '12px',
        padding: '20px',
        maxWidth: '400px',
        margin: '20px auto',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
        color: '#333'
      }}>
        <h2 style={{ color: '#b48f72', marginBottom: '10px' }}>Contacto CuatroK </h2>
        <p><strong>Teléfono:</strong> <a href="tel:935703748" style={{ color: '#333', textDecoration: 'none' }}>935 703 748</a></p>
        <p><strong>Email:</strong> <a href="mailto:CuatroK@gmail.com" style={{ color: '#333', textDecoration: 'none' }}>CuatroK@gmail.com</a></p>
        <p style={{ marginTop: '15px', fontStyle: 'italic' }}>Descubre la elegancia en cada joya </p>
      </div>
      <div className="container ">
       <h1 className="text-center mb-5">Colaboraciones</h1>
       <div className="row">
        <div className="col-md-3 text-center">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwr_zZjgvmu4BccwDNIHic8K5dyehw7cSYA&s" alt=""
        className="rounded-circle mb-3" style={{width: "250px", height: "250px"}}/>
        <p >Diego Ganoza</p>
        </div>
        <div className="col-md-3 text-center">
        <img src="https://muhimu.es/wp-content/uploads/2017/04/FRENTE-NITIDA.jpg" alt=""
        className="rounded-circle  mb-3" style={{width: "250px", height: "250px"}}/>
        <p >Julio Mujica</p>
        </div>
        <div className="col-md-3 text-center">
        <img src="https://www.lavanguardia.com/files/content_image_mobile_filter/uploads/2018/07/25/5fa43c9755611.jpeg" alt=""
        className="rounded-circle  mb-3" style={{width: "250px", height: "250px"}}/>
        <p >Gabriel De Oliveira</p>
        </div>
        <div className="col-md-3 text-center">
        <img src="https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlcnNvbmF8ZW58MHx8MHx8fDA%3D" alt=""
        className="rounded-circle  mb-3" style={{width: "250px", height: "250px"}}/>
        <p >Alejandro Gonzales</p>
        </div>
       </div>
      </div>
    </div>

  );
};