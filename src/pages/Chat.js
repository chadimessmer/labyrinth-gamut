import "../styles/app.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTraces } from "../actions/tracesAction";
import { Link, useLocation } from "react-router-dom";
import uuid from "react-uuid";

const Chat = () => {
  const dispatchVision = useDispatch();
  useEffect(() => {
    dispatchVision(loadTraces());
  }, [dispatchVision]);

  //   let { chatrooms } = useSelector((state) => state.traces);
  const location = useLocation();
  console.log(JSON.stringify(location.pathname));
  let locationId = location.pathname.substring(10);
  console.log(locationId);
  console.log(typeof locationId);
  let { chatrooms } = useSelector((state) => state.traces);
  console.log(chatrooms);
  var thisChatRoom = chatrooms.filter((obj) => {
    return obj.id === parseInt(locationId);
  });
  return (
    <div className="chatroom-page">
      {thisChatRoom[0] !== undefined && <h2>{thisChatRoom[0].attributes.title}</h2>}
      {thisChatRoom[0] !== undefined && <p>{thisChatRoom[0].attributes.introduction}</p>}
    </div>
  );
};

export default Chat;
