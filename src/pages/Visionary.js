import "../styles/app.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { loadTraces } from "../actions/tracesAction";
import Banner from "../components/Banner";

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
        <Banner link={"/lounge"} subTitle={"Lounge"} />
        <div className="visionary-content">
          <h2>VISIONARY</h2>
          {visionary.attributes !== undefined && (
            <div dangerouslySetInnerHTML={{ __html: visionary.attributes.content }} className="visionary-text" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Visionary;
