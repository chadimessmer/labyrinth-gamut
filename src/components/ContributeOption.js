import "../styles/app.scss";
import React, { useState } from "react";
import SubmitImage from "./SubmitImage";
import SubmitVideo from "./SubmitVideo";
import SubmitAudio from "./SubmitAudio";
import SubmitText from "./SubmitText";
import SubmitPdf from "./SubmitPdf";

const ContributeOption = ({ thisTrace }) => {
  const [choice, setChoice] = useState(false);
  const [contributeImage, setContributeImage] = useState(false);
  const [contributeVideo, setContributeVideo] = useState(false);
  const [contributeAudio, setContributeAudio] = useState(false);
  const [contributeText, setContributeText] = useState(false);
  const [contributePdf, setContributePdf] = useState(false);

  const choiceImage = () => {
    setContributeImage(true);
    madeChoice();
  };

  const choicePdf = () => {
    setContributePdf(true);
    madeChoice();
  };

  const choiceVideo = () => {
    setContributeVideo(true);
    madeChoice();
  };

  const choiceAudio = () => {
    setContributeAudio(true);
    madeChoice();
  };

  const choiceText = () => {
    setContributeText(true);
    madeChoice();
  };

  const madeChoice = () => {
    setChoice(true);
  };

  return (
    <div className="contribute-option">
      {!choice && (
        <div>
          <div onClick={choiceImage} className="contribute-button">
            Submit an Image
          </div>
          <div onClick={choiceVideo} className="contribute-button">
            Submit a Video
          </div>
          <div onClick={choiceAudio} className="contribute-button">
            Submit an Audio
          </div>
          <div onClick={choicePdf} className="contribute-button">
            Submit PDF
          </div>
          <div onClick={choiceText} className="contribute-button">
            Submit a Text
          </div>
        </div>
      )}
      {contributeImage && <SubmitImage thisTrace={thisTrace} />}
      {contributeVideo && <SubmitVideo thisTrace={thisTrace} />}
      {contributeAudio && <SubmitAudio thisTrace={thisTrace} />}
      {contributePdf && <SubmitPdf thisTrace={thisTrace} />}
      {contributeText && <SubmitText thisTrace={thisTrace} />}
    </div>
  );
};

export default ContributeOption;
