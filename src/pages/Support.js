import "../styles/app.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { loadTraces } from "../actions/tracesAction";

const Support = () => {
  const dispatchVision = useDispatch();
  useEffect(() => {
    dispatchVision(loadTraces());
  }, [dispatchVision]);

  const { support } = useSelector((state) => state.traces);
  console.log(support);
  return (
    <div className="support-page">
      <div className="support-wrapper">
        <div className="title-support">
          <h1 className="lab-title">labyrinth Lounge</h1>
        </div>
        <div className="support-content">
          <h2>SUPPORT</h2>
          <ReactMarkdown className="support-text">{support.attributes.text}</ReactMarkdown>
          <a href="http://www.paypal.com" target="blank">
            <div className="support-button">Unterstütze uns</div>{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Support;