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

const Chat = () => {
  const dispatchVision = useDispatch();
  useEffect(() => {
    dispatchVision(loadTraces());
  }, [dispatchVision]);

  //   let { chatrooms } = useSelector((state) => state.traces);
  const location = useLocation();
  let locationId = location.pathname.substring(10);
  let { chatrooms } = useSelector((state) => state.traces);
  console.log(chatrooms);
  var thisChatRoom = chatrooms.filter((obj) => {
    return obj.id === parseInt(locationId);
  });
  let chatRoomId;
  if (thisChatRoom[0]) {
    chatRoomId = thisChatRoom[0].id;
  }
  const chatUrl = "https://labyrinthbackend.herokuapp.com/api/comments/api::chatroom.chatroom:";
  let comments;

  axios.get(chatUrl + chatRoomId).then(function (response) {
    console.log(response);

    comments = response.data;
  });

  console.log(chatRoomId);
  return (
    <div className="chatroom-page">
      <Banner subTitle={"Lounge"} />
      {thisChatRoom[0] !== undefined && <h2>{thisChatRoom[0].attributes.title}</h2>}
      {thisChatRoom[0] !== undefined && <p>{thisChatRoom[0].attributes.introduction}</p>}
      <PostComment chatRoomId={chatRoomId} />
    </div>
  );
};

export default Chat;
