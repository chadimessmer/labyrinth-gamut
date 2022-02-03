import React from "react";
import { tracesUrl } from "../api";
import "../styles/app.scss";

const Trace = ({ title }) => {
  return (
    <div className="title-box">
      <div className="title-box-background"></div>
      <h3 className="title-intro">{title} </h3>
    </div>
  );
};

export default Trace;
