import "../styles/app.scss";
import React from "react";
import axios from "axios";

const SubmitText = ({ thisTrace }) => {
  let url = "https://labyrinthbackend.herokuapp.com/api/articles";
  function submitNewText(e) {
    let submitChatroom = document.forms.namedItem("submit-text");
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
    finalValue.type = [{ text: textSend, __component: "text.text" }];
    const dt = { data: finalValue };
    console.log(dt);
    axios
      .post(url, dt)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }
  return (
    <div className="submit-form">
      <h2>Submit a Text</h2>
      <form name="submit-text" onSubmit={submitNewText}>
        <label for="name">Name </label> <br />
        <input required id="name" name="author" type="text"></input> <br />
        <label for="title">Title</label> <br />
        <input required id="title" name="title" type="text"></input> <br />
        <label for="text">Text</label> <br />
        <textarea id="text" name="text"></textarea> <br />
        <label for="website">Link</label> <br />
        <input type="url" name="website" id="website"></input>
        <button type="submit" className="contribute-button">
          Continue
        </button>
      </form>
    </div>
  );
};

export default SubmitText;
