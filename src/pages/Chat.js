import "../styles/app.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTraces } from "../actions/tracesAction";
import { Link, useLocation } from "react-router-dom";
import uuid from "react-uuid";
import Banner from "../components/Banner";
import RecursiveContainer from "../components/SingleComment";
import axios from "axios";
import PostComment from "../components/PostComment";
import AnswerChat from "../components/AnswerChat";

const Chat = () => {
  const dispatchVision = useDispatch();
  useEffect(() => {
    dispatchVision(loadTraces());
  }, [dispatchVision]);

  //   let { chatrooms } = useSelector((state) => state.traces);
  const location = useLocation();
  let locationId = location.pathname.substring(10);
  let { chatrooms, comment } = useSelector((state) => state.traces);
  console.log(chatrooms);
  let thisChatRoom = chatrooms.filter((obj) => {
    return obj.id === parseInt(locationId);
  });
  let chatRoomId;
  if (thisChatRoom[0]) {
    chatRoomId = thisChatRoom[0].id;
  }
  console.log(comment);
  var articlesOrdered;
  let finalComment = [];
  let reorderedComment;
  let reversedComment;
  if (comment[0]) {
    articlesOrdered = comment.filter((obj) => {
      return obj.attributes.chatroom.data.id === parseInt(locationId);
    });
    if (articlesOrdered[0]) {
      console.log(articlesOrdered);
      articlesOrdered.sort(function (a, b) {
        return a.id - b.id;
      });
      reversedComment = articlesOrdered.reverse();
      for (let com of reversedComment) {
        com["answer"] = [];
      }
      console.log(reversedComment);
      if (reversedComment.length > 0) {
        for (let id of reversedComment) {
          if (id.attributes.chatmessage.data) {
            let relatedId = id.attributes.chatmessage.data.id;
            reversedComment.find((x) => x.id === relatedId)["answer"].push(id);
          } else {
            finalComment.push(id);
          }
        }
      }
      console.log(reversedComment);
      if (reversedComment[0]) {
        for (let id of reversedComment) {
          let children = id.answer;

          if (children.length > 0) {
            children.reverse();
          }
        }
      }
      console.log(finalComment);

      reorderedComment = finalComment.reverse();

      console.log(chatRoomId);
    }
  }

  return (
    <div className="chatroom-page">
      <Banner subTitle={"Lounge"} />
      <div className="chat-container">
        {thisChatRoom[0] !== undefined && <h2>{thisChatRoom[0].attributes.title}</h2>}
        {thisChatRoom[0] !== undefined && <p>{thisChatRoom[0].attributes.introduction}</p>}
        {reversedComment !== undefined &&
          reorderedComment.map((reorderedComment) => <RecursiveContainer chatRoomId={chatRoomId} key={uuid()} finalComment={reorderedComment} />)}
        <AnswerChat chatRoomId={chatRoomId} />
      </div>
    </div>
  );
};

export default Chat;
