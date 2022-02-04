import "../styles/app.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { loadTraces } from "../actions/tracesAction";

const Visionary = () => {
  const dispatchVision = useDispatch();
  useEffect(() => {
    dispatchVision(loadTraces());
  }, [dispatchVision]);

  const { visionary } = useSelector((state) => state.traces);
  console.log(visionary);
  return (
    <div className="visionary-page">
      <div className="visionary-wrapper">
        <div className="title-visionary">
          <h1 className="lab-title">labyrinth Lounge</h1>
        </div>
        <div className="visionary-content">
          <h2>VISIONARY</h2>
          {visionary.attributes !== undefined && <ReactMarkdown className="visionary-text">{visionary.attributes.content}</ReactMarkdown>}
        </div>
      </div>
    </div>
  );
};

export default Visionary;
