

export const CategoryCard = ({ image, name, price }) => {
  return (
    <div className="row">
      <div className="card col-md-4" style={{ width: "18rem" }}>
        <img src={image} className="card-img-top" alt={name} />
        <div className="card-body">
          <p className="card-text"><strong>{name}</strong></p>
          <p className="card-text">Precio: €{price}</p>
        </div>
      </div>
    </div>
  );
};