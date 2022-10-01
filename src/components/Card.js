import React from "react";
import "../style/Card.css";

const Card = (props) => {
  const name = props.name;
  return (
    <img
      src={require(`../style/images/${name}.png`)}
      alt={name}
      id={name}
    ></img>
  );
};

export default Card;
