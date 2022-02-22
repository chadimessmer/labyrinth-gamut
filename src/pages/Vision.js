import "../styles/app.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { loadTraces } from "../actions/tracesAction";
import Banner from "../components/Banner";

const Vision = () => {
  const dispatchVision = useDispatch();
  useEffect(() => {
    dispatchVision(loadTraces());
  }, [dispatchVision]);

  const { vision } = useSelector((state) => state.traces);
  console.log(vision);
  return (
    <div className="vision-page">
      <div className="vision-wrapper">
        <Banner link={"/lounge"} subTitle={"Lounge"} />
        <div className="vision-content">
          <h2>VISION</h2>
          {vision.attributes !== undefined && <ReactMarkdown className="vision-text">{vision.attributes.content}</ReactMarkdown>}
        </div>
      </div>
    </div>
  );
};

export default Vision;
