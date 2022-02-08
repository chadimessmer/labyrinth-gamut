import "../styles/app.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTraces } from "../actions/tracesAction";
import { Link, Routes, Route } from "react-router-dom";
import Banner from "../components/Banner";

const Lounge = () => {
  return (
    <div className="lounge">
      <Banner subTitle={"Lounge"} />
      <div className="visions">
        <Link to="/vision">
          <div className="vision">
            <h2>VISION</h2>
          </div>
        </Link>
        <Link to="/chatroom">
          <div className="chatrooms">
            <h2>CHATROOM</h2>
          </div>
        </Link>
        <Link to="/visionary">
          <div className="visionarys">
            <h2>VISIONARYS</h2>
          </div>
        </Link>
        <Link to="/support">
          <div className="support">
            <h2>SUPPORT</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Lounge;
