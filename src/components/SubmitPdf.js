import "../styles/app.scss";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SubmitPdf = ({ thisTrace }) => {
  const [hasContributed, setHasContributed] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isWriting, setIswriting] = useState(true);
  let url = "https://labyrinthbackend.herokuapp.com/api/articles";
  let urlUpload = "https://labyrinthbackend.herokuapp.com/api/upload";
  function submitNewPdf(e) {
    let submitChatroom = document.forms.namedItem("submit-pdf");
    e.preventDefault();
    let dataForm = new FormData(submitChatroom);
    const value = Object.fromEntries(dataForm.entries());
    const relatedId = { id: thisTrace[0].id };
    // console.log(thisTrace);
    setIswriting(false);
    setIsSent(true);

    const finalValue = {};
    finalValue.author = value.author;
    finalValue.title = value.title;
    finalValue.trace = relatedId;
    finalValue.website = value.website;
    const dt = { data: finalValue };
    console.log(dt);
    axios
      .post(url, dt)
      .then(function (response) {
        console.log(response.data);
        let pdf = new FormData();
        pdf.append("ref", "api::article.article");
        pdf.append("field", "single_media");
        pdf.append("refId", response.data.data.id);
        pdf.append("files", value.file, value.file.name);
        console.log(pdf);
        axios
          .post(urlUpload, pdf)
          .then((res) => {
            console.log(res);
            setHasContributed(true);
            setIsSent(false);
          })
          .catch(function (error) {
            console.log(error.response);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="submit-form">
      {isWriting && (
        <div>
          <h2>Submit a PDF</h2>
          <form name="submit-pdf" onSubmit={submitNewPdf}>
            <label htmlFor="name">Name </label> <br />
            <input required id="name" name="author" type="text"></input> <br />
            <label htmlFor="title">Title</label> <br />
            <input required id="title" name="title" type="text"></input> <br />
            <label htmlFor="file">PDF</label> <br />
            <input required name="file" id="file" type="file" accept="application/pdf"></input> <br />
            <label htmlFor="website">Link</label> <br />
            <input type="link" name="website" id="website"></input>
            <div className="button-div">
              <button type="submit" className="contribute-button">
                Continue
              </button>
            </div>
          </form>
        </div>
      )}

      {isSent && <div>Please wait</div>}
      {hasContributed && (
        <div>
          <p>Thank you</p>
          <Link to={"/trace/" + thisTrace[0].id}>
            <div className="contribute-button">Continue</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SubmitPdf;
