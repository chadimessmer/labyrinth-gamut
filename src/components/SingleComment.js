import React from "react";
import ReactMarkdown from "react-markdown";
import AnswerChat from "./AnswerChat";
import uuid from "react-uuid";
import { formatDistance } from "date-fns";

const RecursiveContainer = ({ finalComment, chatRoomId }) => {
  let message = finalComment.attributes.chat;
  let thisId = finalComment.id;
  let children = finalComment.answer;
  let name = finalComment.attributes.name;
  let answerTo = finalComment.id;
  let dateRaw = finalComment.attributes.publishedAt;

  const current = new Date();
  console.log(current);

  let newDate = new Date();
  let dateNow = newDate.getDate();
  console.log(dateNow);
  let date = new Date(dateRaw);
  console.log(date);
  // formatDistance(date);

  const style = {
    paddingLeft: "20px",
  };

  let color = "hsl(" + Math.random() * 360 + ", 100%, 70%)";

  let gradientBeg = "radial-gradient(circle, ";
  let gradentEnd = " 0%, rgba(255,255,255,0) 80%)";
  let gradient = gradientBeg + color + gradentEnd;

  const avatar = {
    background: gradient,
  };

  return (
    <div className="single-comment" style={style}>
      <div className="title-avatar">
        <div style={avatar} className="avatar"></div>
        <p>{name}</p>
        <p>{formatDistance(date, current)}</p>
      </div>
      <ReactMarkdown key={uuid()}>{message}</ReactMarkdown>
      <AnswerChat name={name} answerTo={answerTo} chatRoomId={chatRoomId} />

      {children && children.map((children) => <RecursiveContainer answerTo={thisId} chatRoomId={chatRoomId} key={uuid()} finalComment={children} />)}
    </div>
  );
};

export default RecursiveContainer;
