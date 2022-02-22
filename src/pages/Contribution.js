import "../styles/app.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTraces } from "../actions/tracesAction";
import ContributeOption from "../components/ContributeOption";
import uuid from "react-uuid";
import { useLocation } from "react-router-dom";

import Banner from "../components/Banner";

const Contribution = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTraces());
  }, [dispatch]);

  const { trace } = useSelector((state) => state.traces);

  const location = useLocation();
  let locationId = location.pathname.substring(14);
  let thisTrace = trace.filter((obj) => {
    return obj.id === parseInt(locationId);
  });

  let contributionIntro;
  let traceName;
  const [continueContribute, setContinue] = useState(false);
  const [accepted, setAccepted] = useState(true);

  if (thisTrace[0]) {
    contributionIntro = thisTrace[0].attributes.contribution_intro;
    traceName = thisTrace[0].attributes.title;
  }

  const okContinue = () => {
    setAccepted(false);
    setContinue(true);
    console.log(accepted);
  };
  const contribute = () => {
    if (thisTrace[0] && thisTrace[0].attributes.public_contribution) {
      return (
        <div>
          <h2>Contribute to {traceName} !</h2>
          {accepted && (
            <div>
              <p>{contributionIntro}</p>
              <div onClick={okContinue} className="contribute-button">
                Continue
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return <div>This Trace is not open for public contributions.</div>;
    }
  };

  console.log(thisTrace);

  // console.log(locationId);

  return (
    <div>
      <div className="contribute-wrapper">
        <Banner link={"/lounge"} subTitle={"Contribution"} />
        <div className="contribution-container">
          {contribute()}
          {continueContribute && <ContributeOption thisTrace={thisTrace} />}
        </div>
      </div>
    </div>
  );
};

export default Contribution;
