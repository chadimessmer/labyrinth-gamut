import React from "react";
import { tracesUrl } from "../api";
import "../styles/app.scss";

const Trace = ({ title, index, lay }) => {
  let color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";

  let thisTrace = index + 1;

  let classTrace = "trace" + thisTrace + " trace " + "lay" + lay;

  const style = {
    backgroundColor: color,
  };
  return (
    <div className={classTrace}>
      <div className="title-box">
        <div className="title-box-background"></div>
        <h3 className="title-intro">{title} </h3>
      </div>
    </div>
  );
};

export default Trace;
