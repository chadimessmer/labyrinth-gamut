import "../styles/app.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTraces } from "../actions/tracesAction";
import { Link } from "react-router-dom";

const Chatroom = () => {
  const dispatchVision = useDispatch();
  useEffect(() => {
    dispatchVision(loadTraces());
  }, [dispatchVision]);

  const { chatrooms } = useSelector((state) => state.traces);
  // chatrooms.reverse();

  return (
    <div className="chatroom-page">
      <div className="chatroom-wrapper">
        <div className="title-chatroom">
          <h1 className="lab-title">labyrinth Lounge</h1>
        </div>
        <div className="chatroom-content">
          <h2>Chatroom</h2>
          <div>
            <p>Start new discussion</p>
            {chatrooms.map((chatrooms) => (
              <Link to={chatrooms.attributes.title}>
                <p key={chatrooms.id}>{chatrooms.attributes.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;
