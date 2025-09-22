import "./categoryCardStyles.css"

export const CategoryCard = ({ image, name, price }) => {
  return (
    <div className="row">
      <div className="card col-md-3" style={{ width: "18rem" }}>
        <div className="card-img-container">
          <img src={image} className="card-img-top img-fluid" alt={name} />
        </div>
        <div className="card-body">
          <p className="card-text"><strong>{name}</strong></p>
          <p className="card-text">Precio: €{price}</p>
        </div>
      </div>
    </div>
  );
};