

export const CategoryCard = ({ image, name, price }) => {
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img src={image} className="card-img-top" alt={nombre} />
        <div className="card-body">
          <p className="card-text"><strong>{name}</strong></p>
          <p className="card-text">Precio: €{price}</p>
        </div>
      </div>
    </div>
  );
};