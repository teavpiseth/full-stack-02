/* eslint-disable react/prop-types */
import "./category.css";

export default function Category({ name, image, price }) {
  return (
    <div className="card-category">
      <img src={image} className="category-img" />
      <p style={{ background: "rgba(41, 124, 213, 0.09)", margin: "0" }}>
        {name} {price + 2} $
      </p>
    </div>
  );
}
