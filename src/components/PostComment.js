import "../styles/app.scss";
import React from "react";
import axios from "axios";

const PostComment = ({ chatRoomId }) => {
  let url = "https://labyrinthbackend.herokuapp.com/api/comments/api::chatroom.chatroom:";
  function submitNewText(e) {
    let submitChatroom = document.forms.namedItem("submit-text");
    e.preventDefault();
    console.log(e.target[0].value);
    let dataForm = new FormData(submitChatroom);
    const value = Object.fromEntries(dataForm.entries());

    const finalValue = {};
    finalValue.author = { name: value.name, id: "123456" };
    finalValue.content = value.text;
    finalValue.realtion = { chatroom: "1" };
    const dt = { data: finalValue };
    console.log(chatRoomId);
    axios
      .post(url + chatRoomId, finalValue)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }
  return (
    <div className="submit-form">
      <div>
        <form name="submit-text" onSubmit={submitNewText}>
          <label htmlFor="name">Name </label> <br />
          <input required id="name" name="author" type="text"></input> <br />
          <label htmlFor="text">Text</label> <br />
          <textarea id="text" name="text"></textarea> <br />
          <button type="submit" className="contribute-button">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostComment;
