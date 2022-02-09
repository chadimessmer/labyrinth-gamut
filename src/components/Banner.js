import "../styles/app.scss";
import React from "react";
import { Link } from "react-router-dom";

const Banner = ({ subTitle }) => {
  return (
    <div className="banner-container">
      <div>
        <Link to={"/"}>LABYRINTH</Link> <span>{subTitle}</span>
      </div>
    </div>
  );
};

export default Banner;
