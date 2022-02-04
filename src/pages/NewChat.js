import "../styles/app.scss";
import React from "react";
import axios from "axios";

const NewChat = () => {
  let url = "https://labyrinthbackend.herokuapp.com/api/chatrooms";
  function submitNewChat(e) {
    let submitChatroom = document.forms.namedItem("form-submit-chatroom");

    e.preventDefault();
    console.log(e);
    let dataForm = new FormData(submitChatroom);
    const value = Object.fromEntries(dataForm.entries());
    const dt = { data: value };
    const redirectUrl = "/" + value.title;
    console.log(dt);
    axios
      .post(url, dt)
      .then(function (response) {
        console.log(response.data.data.id);
        let idLink = response.data.data.id;
        window.location.href = "/chatroom/" + idLink;
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }
  return (
    <div className="new-chat">
      <form className="form" name="form-submit-chatroom" onSubmit={submitNewChat}>
        <label htmlFor="title-chat">Title of chatroom :</label> <br></br>
        <input required type="text" name="title" id="title-chat"></input>
        <br></br>
        <label htmlFor="intro-chat">Introduction to chatroom : </label>
        <br></br>
        <textarea required name="introduction" id="intro-chat"></textarea>
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default NewChat;
