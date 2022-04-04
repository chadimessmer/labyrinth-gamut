import "../styles/app.scss";
import React from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";

const Lounge = () => {
  return (
    <div className="lounge">
      <Banner link={"/"} subTitle={"Lounge"} />
      <div className="visions">
        <Link to="/vision">
          <div className="vision block">
            <h2>VISION</h2>
          </div>
        </Link>
        <div className="trans one"></div>
        <Link to="/chatroom">
          <div className="chatrooms block">
            <h2>CHATROOM</h2>
          </div>
        </Link>
        <div className="trans two"></div>
        <Link to="/visionary">
          <div className="visionarys block">
            <h2>VISIONARYS</h2>
          </div>
        </Link>
        <div className="trans three"></div>
        <Link to="/support">
          <div className="support block">
            <h2>SUPPORT</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Lounge;
