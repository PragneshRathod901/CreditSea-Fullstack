import React from "react";
import "./index.css";

const BulletPoint = ({ heading, content }) => {
  return (
    <li>
      <div>{heading + " :"}</div>
      <div>{content}</div>
    </li>
  );
};

export default BulletPoint;
