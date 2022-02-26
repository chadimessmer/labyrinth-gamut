import "../styles/app.scss";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SubmitImage = ({ thisTrace }) => {
  const [hasContributed, setHasContributed] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isWriting, setIswriting] = useState(true);

  let url = "https://labyrinthbackend.herokuapp.com/api/articles";
  let urlUpload = "https://labyrinthbackend.herokuapp.com/api/upload";
  function submitNewImage(e) {
    let submitChatroom = document.forms.namedItem("submit-image");
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
        let image = new FormData();
        image.append("ref", "api::article.article");
        image.append("field", "single_media");
        image.append("refId", response.data.data.id);
        image.append("files", value.file, value.file.name);
        console.log(image);
        axios
          .post(urlUpload, image)
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
          <h2>Submit an Image</h2>
          <form name="submit-image" onSubmit={submitNewImage}>
            <label htmlFor="name">Name </label> <br />
            <input required id="name" name="author" type="text"></input> <br />
            <label htmlFor="title">Title</label> <br />
            <input required id="title" name="title" type="text"></input> <br />
            <label htmlFor="file">Image (png/jpg)</label> <br />
            <input required name="file" id="file" type="file" accept=".png, .jpg, .jpeg"></input> <br />
            <label htmlFor="website">Link</label> <br />
            <input type="link" name="website" id="website"></input>
            <div className="button-div"></div>
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

export default SubmitImage;
