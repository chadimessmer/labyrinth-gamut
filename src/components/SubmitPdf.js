import "../styles/app.scss";
import React from "react";

const SubmitPdf = ({ subTitle }) => {
  return (
    <div className="submit-form">
      <h2>Submit a PDF</h2>
      <form>
        <label for="name">Name </label> <br />
        <input id="name" name="author" type="text"></input> <br />
        <label for="title">Title</label> <br />
        <input id="title" name="title" type="text"></input> <br />
        <label for="file">Video</label> <br />
        <input id="file" type="file" accept="application/pdf"></input> <br />
        <label for="website">Link</label> <br />
        <input type="text" name="website" id="website"></input>
        <button type="submit" className="contribute-button">
          Continue
        </button>
      </form>
    </div>
  );
};

export default SubmitPdf;