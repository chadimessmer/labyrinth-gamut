import React from "react";
import ReactMarkdown from "react-markdown";
import AnswerChat from "./AnswerChat";
import uuid from "react-uuid";

const RecursiveContainer = ({ finalComment, chatRoomId }) => {
  let message = finalComment.attributes.chat;
  let thisId = finalComment.id;
  let children = finalComment.answer;
  let name = finalComment.attributes.name;
  let answerTo = finalComment.id;
  console.log(answerTo);

  const style = {
    paddingLeft: "20px",
  };

  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  let gradientBeg = "radial-gradient(circle, ";
  let gradentEnd = " 0%, rgba(255,255,255,0) 80%)";
  let gradient = gradientBeg + "#" + randomColor + gradentEnd;

  const avatar = {
    background: gradient,
  };

  return (
    <div className="single-comment" style={style}>
      <div className="title-avatar">
        <div style={avatar} className="avatar"></div>
        <p>{name}</p>
        <p>date</p>
      </div>
      <ReactMarkdown key={uuid()}>{message}</ReactMarkdown>
      <AnswerChat name={name} answerTo={answerTo} chatRoomId={chatRoomId} />

      {children && children.map((children) => <RecursiveContainer answerTo={thisId} chatRoomId={chatRoomId} key={uuid()} finalComment={children} />)}
    </div>
  );
};

export default RecursiveContainer;
