import "../styles/app.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { loadTraces } from "../actions/tracesAction";
import Banner from "../components/Banner";

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
        <Banner link={"/lounge"} subTitle={"Lounge"} />
        <div className="support-content">
          <h2>SUPPORT</h2>
          {support.attributes !== undefined && <div dangerouslySetInnerHTML={{ __html: support.attributes.text }} className="support-text" />}

          <a href="http://www.paypal.com" target="blank">
            <div className="support-button">Unterstütze uns</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Support;
