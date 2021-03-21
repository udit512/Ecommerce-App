import React from "react";

const Rating = ({ value, text, color }) => {
  const stars = Math.trunc(value);
  const dec = value - Math.floor(value);
  let content = [];
  for (let i = 0; i < stars; i++) {
    content.push(
      <span>
        <i style={{ color }} className="fas fa-star"></i>
      </span>
    );
  }
  if (dec > 0.0) {
    content.push(
      <span>
        <i style={{ color }} className="fas fa-star-half-alt"></i>
      </span>
    );
  }
  for (let i = Math.ceil(value); i < 5; i++) {
    content.push(
      <span>
        <i style={{ color }} className="far fa-star"></i>
      </span>
    );
  }

  return (
    <div className="rating">
      {content}
      <span>{text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
