import "../styles/app.scss";
import React from "react";
import { Link } from "react-router-dom";

const Banner = ({ subTitle, link }) => {
  return (
    <div className="banner-container">
      <div>
        <Link to={link}>LABYRINTH</Link> <span>{subTitle}</span>
      </div>
    </div>
  );
};

export default Banner;
