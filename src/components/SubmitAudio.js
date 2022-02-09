import "../styles/app.scss";
import React from "react";
import axios from "axios";

const SubmitAudio = ({ thisTrace }) => {
  let url = "https://labyrinthbackend.herokuapp.com/api/articles";
  let urlUpload = "https://labyrinthbackend.herokuapp.com/api/upload";
  function submitNewAudio(e) {
    let submitChatroom = document.forms.namedItem("submit-audio");
    e.preventDefault();
    let dataForm = new FormData(submitChatroom);
    const value = Object.fromEntries(dataForm.entries());
    const relatedId = { id: thisTrace[0].id };
    // console.log(thisTrace);
    const textSend = value.text;

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
        let audio = new FormData();
        audio.append("ref", "api::article.article");
        audio.append("field", "single_media");
        audio.append("refId", response.data.data.id);
        audio.append("files", value.file, value.file.name);
        console.log(audio);
        axios
          .post(urlUpload, audio)
          .then((res) => {
            console.log(res);
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
      <h2>Submit an Audio</h2>
      <form name="submit-audio" onSubmit={submitNewAudio}>
        <label for="name">Name </label> <br />
        <input id="name" name="author" type="text"></input> <br />
        <label for="title">Title</label> <br />
        <input id="title" name="title" type="text"></input> <br />
        <label for="file">Audio</label> <br />
        <input id="file" type="file" name="file" accept="audio/*"></input> <br />
        <label for="website">Link</label> <br />
        <input type="link" name="website" id="website"></input>
        <button type="submit" className="contribute-button">
          Continue
        </button>
      </form>
    </div>
  );
};

export default SubmitAudio;
