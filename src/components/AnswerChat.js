import "../styles/app.scss";
import React, { useState } from "react";
import uuid from "react-uuid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const AnswerChat = ({ answerTo, chatRoomId, name }) => {
  const [wantReply, setWantReply] = useState(false);
  const { comment } = useSelector((state) => state.traces);

  const formName = uuid();
  function submitNewChat(e) {
    e.preventDefault();

    const url = "https://labyrinthbackend.herokuapp.com/api/chatmessages";
    let submitChat = document.forms.namedItem(formName);
    let dataForm = new FormData(submitChat);
    const value = Object.fromEntries(dataForm.entries());

    // const chat = { data: { id: chatRoomId } };
    // const answer = { data: { id: answerTo } };

    console.log(dataForm);
    const finalValue = {};
    finalValue.name = value.name;
    finalValue.chat = value.chat;
    finalValue.chatroom = chatRoomId;
    finalValue.chatmessage = answerTo;
    const dt = { data: finalValue };
    console.log(dt);
    axios
      .post(url, dt)
      .then(function (response) {
        console.log(response.data.data);
        setWantReply(false);
        comment.push(response.data.data);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }

  const reply = () => {
    if (!wantReply) {
      setWantReply(true);
    } else {
      setWantReply(false);
    }
  };

  return (
    <div className="answer">
      <p className="reply" onClick={reply}>
        reply{name && <span> to {name}</span>}
      </p>
      {wantReply && (
        <form name={formName} onSubmit={submitNewChat}>
          <input required name="name" type="text" placeholder="Name"></input> <br />
          <textarea required name="chat" placeholder="your messsage hier"></textarea> <br />
          <button type="submit">send</button>
        </form>
      )}
    </div>
  );
};

export default AnswerChat;
